import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

declare let L;
L;
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
})
export class MapComponent implements OnInit {
  reference = this.fb.group({
    point: [null],
  }); //dropdown menu
  search = this.fb.group({
    latitude: ['', Validators.required],
    longitude: [
      '',
      Validators.required,
      // Validators.pattern(/^\d+(\.\d{1,})?$/),
    ],
  });
  overview = this.fb.group({ describe: ['', Validators.required] });
  description: boolean = false;
  overviewDetails: any;
  map: any;
  markers = new L.FeatureGroup(); //view maker when item is searched
  geofencinggMsg: [string] = [''];
  references = [
    { point: [6.46, 3.39], name: 'Device 1' },
    { point: [9.07, 7.03], name: 'Device 2' },
    { point: [4.87, 6.97], name: 'Device 3' },
    { point: [4.87, 6.97], name: 'Show Geofencing' },
    { point: [4.87, 6.97], name: 'Show Geofencing Data' },
  ];
  constructor(private fb: FormBuilder) {}
  ngOnInit(): void {
    this.reference.patchValue({ point: this.references[0] });
    this.mapLoad(this.references[0].point); //initial location on map view
    this.onGeofencingView();
  }

  updateLocation() {
    // remove the amap layer
    if (this.map != undefined) {
      this.map.remove();
    }
    this.mapLoad(this.reference.value.point.point);
    // load geofencing data local storage
    if (this.reference.value.point.name === 'Show Geofencing') {
      this.onGeofencingView();
    }
    if (this.reference.value.point.name === 'Show Geofencing Data') {
      this.onGeofencingResult();
    }
  }

  onGeofencingView() {
    let data = JSON.parse(localStorage.getItem('points'));
    if (data === null) {
      return alert('No geofenced Data available');
    }
    // loop over the data and and display geofencing type
    console.log(data);

    data.forEach(({ value, id }) => {
      const { type, radius, bounds } = value;
      if (type === 'rectangle') {
        L.rectangle(bounds, {
          color: '#FF0000',
          opacity: 0.6,
          fillOpacity: 0.2,
        })
          .addTo(this.map)
          .bindPopup(id);
      } else if (type === 'polyline') {
        L.polyline(bounds, {
          color: '#FF0000',
          opacity: 0.6,
          fillOpacity: 0.2,
        })
          .addTo(this.map)
          .bindPopup(id);
      } else if (type === 'polygon') {
        L.polygon(bounds, {
          color: '#FF0000',
          opacity: 0.6,
          fillOpacity: 0.2,
        })
          .addTo(this.map)
          .bindPopup(id);
      } else {
        L.circle(bounds, {
          color: '#FF0000',
          opacity: 0.6,
          fillOpacity: 0.2,
          radius: radius,
        })
          .addTo(this.map)
          .bindPopup(id);
      }
    });
  }

  onGeofencingResult() {
    let data = JSON.parse(localStorage.getItem('points'));
    if (data === null) {
      return alert('No geofenced Data available');
    }
    let latLng = [
      { point: [12, 7] },
      { point: [9.07, 7.03] },
      { point: [4.87, 6.97] },
    ];
    let msg: string;
    latLng.map(({ point }) => {
      let marker = L.marker(point);
      data.forEach(({ value, id }) => {
        const { bounds, radius } = value;
        if (radius) {
          if (marker.getLatLng().distanceTo(bounds) <= radius) {
            msg = `${point[0]}° N, ${point[1]}° E lies within the ${id} geofence`;
          } else {
            msg = `${point[0]}° N, ${point[1]}° E does not lies within the ${id} geofence`;
          }
        } else {
          let polygon = L.polygon(bounds);
          if (polygon.contains(marker.getLatLng())) {
            msg = `${point[0]}° N, ${point[1]}° E lies within the ${id} geofence`;
          } else {
            msg = `${point[0]}° N, ${point[1]}° E does not lies within the ${id} geofence`;
          }
        }
        this.geofencinggMsg.push(msg);

        // if (radius && marker.getLatLng().distanceTo(bounds) <= radius) {
        //   msg = `${point[0]}° N, ${point[1]}° E lies within the ${id} geofence`;
        //   this.geofencinggMsg.push(msg);
        // }
        // let polygon = L.polygon(bounds);
        // if (!radius && polygon.contains(marker.getLatLng())) {
        //   msg = `${point[0]}° N, ${point[1]}° E lies within the ${id} geofence`;
        //   this.geofencinggMsg.push(msg);
        // }
      });
    });
  }

  onSearch() {
    let data = JSON.parse(localStorage.getItem('points'));
    if (this.markers != undefined) {
      this.markers.clearLayers();
      this.map.removeLayer(this.markers);
    }
    const { latitude, longitude } = this.search.value;
    let marker = L.marker([latitude, longitude]).addTo(this.markers);
    this.markers.addTo(this.map);
    // this.map.fitBounds(this.markers.getBounds());

    this.onGeofencingView();

    data.forEach(({ data, details }) => {
      const { bounds, radius } = data;
      if (radius) {
        let circle = L.circle(bounds, { radius });
        // marker <= radius
        if (marker.getLatLng().distanceTo(bounds) <= radius) {
          circle
            .setStyle({ color: '#FF0000', opacity: 0.6, fillOpacity: 0.2 })
            .addTo(this.map)
            .bindPopup(details.describe);
        }
      } else {
        let polygon = L.polygon(bounds);
        if (polygon.contains(marker.getLatLng())) {
          polygon
            .setStyle({ color: '#FF0000', opacity: 0.6, fillOpacity: 0.2 })
            .addTo(this.map)
            .bindPopup(details.describe);
        }
      }
    });
  }

  onOverview() {
    let data = JSON.parse(localStorage.getItem('points'));
    const values = { data: this.overviewDetails, details: this.overview.value };
    if (this.overviewDetails) {
      if (localStorage.getItem('points')) {
        data.push(values);
        localStorage.setItem('points', JSON.stringify(data));
      } else {
        const values = [
          { data: this.overviewDetails, details: this.overview.value },
        ];
        localStorage.setItem('points', JSON.stringify(values));
      }
    }
    this.description = false;
  }

  onSaveGeofence() {
    let data = JSON.parse(localStorage.getItem('points'));
    const values = this.overviewDetails;
    if (localStorage.getItem('points')) {
      data.push(values);
      localStorage.setItem('points', JSON.stringify(data));
    } else {
      const values = [this.overviewDetails];
      localStorage.setItem('points', JSON.stringify(values));
    }
  }

  mapLoad(point) {
    this.map = L.map('map-test').setView([7.37, 3.94], 5);
    let googleStreets = L.tileLayer(
      'http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}',
      {
        maxZoom: 20,
        subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
      }
    );
    let googleSat = L.tileLayer(
      'http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}',
      {
        maxZoom: 20,
        subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
      }
    );
    const t_url = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
    const attribution = '';
    ('Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>');
    const tiles = L.tileLayer(t_url, { attribution, maxZoom: 18 });
    let googleHybrid = L.tileLayer(
      'http://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}',
      {
        maxZoom: 20,
        subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
      }
    );
    let googleTerrain = L.tileLayer(
      'http://{s}.google.com/vt/lyrs=p&x={x}&y={y}&z={z}',
      {
        maxZoom: 20,
        subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
      }
    );
    // tiles.addTo(this.map);
    googleStreets.addTo(this.map);
    // googleHybrid.addTo(this.map);
    // googleSat.addTo(this.map);
    // googleTerrain.addTo(this.map);
    let marker = L.marker(point);
    marker.addTo(this.map);

    let drawnItems = new L.FeatureGroup();
    drawnItems.addTo(this.map);
    this.map.addLayer(drawnItems);

    let drawControl = new L.Control.Draw({
      draw: {
        position: 'topleft',
        polygon: true,
        polyline: true,
        rectangle: {},
        circle: true,
        marker: false,
        circlemarker: false,
      },
      edit: {
        featureGroup: drawnItems,
        edit: false,
        remove: false,
      },
    });

    this.map.addControl(drawControl);

    this.map.on(L.Draw.Event.CREATED, (event) => {
      var type = event.layerType,
        layer = event.layer;
      let data = JSON.parse(localStorage.getItem('points'));
      this.description = true;

      let id = this.getName(layer);
      if (id === null) return;
      let len = id.length;

      while (len > 10) {
        let id = this.getName(layer);
        len = id.length;
      }

      let createdPolygonTemplate =
        '<form id="popup-form">\
<label for="input-speed">Name:</label>\
<input id="name" type="text" />\
</form>';

      var template =
        '<form id="popup-form">\
  <label for="input-speed">New speed:</label>\
  <input id="input-speed" class="popup-input" type="number" />\
  <button id="button-submit" type="button">Save Changes</button>\
</form>';

      // handle circle differently
      if (type === 'circle') {
        const value: unknown = {
          bounds: layer.getLatLng(),
          type: type,
          radius: layer.getRadius(),
        };
        this.overviewDetails = { value, id };
        this.onSaveGeofence();
        // if (localStorage.getItem('points')) {
        //   const value: unknown = {
        //     bounds: layer.getLatLng(),
        //     type: type,
        //     radius: layer.getRadius(),
        //   };
        //   layer.bindPopup('Text');
        //   data.push(value);
        //   localStorage.setItem('points', JSON.stringify(data));
        // } else {
        //   const value: unknown = [
        //     {
        //       bounds: layer.getLatLng(),
        //       type: type,
        //       radius: layer.getRadius(),
        //     },
        //   ];
        //   localStorage.setItem('points', JSON.stringify(value));
        // }
      } else if (type === 'marker') {
        //handle marker action
        data.forEach(({ bounds, radius }) => {
          if (radius) {
            let circle = L.circle(bounds, { radius });
            // marker <= radius
            if (layer.getLatLng().distanceTo(bounds) <= radius) {
              circle
                .setStyle({ color: '#FF0000', opacity: 0.6, fillOpacity: 0.2 })
                .addTo(this.map);
            }
            // console.log(bounds.getNorthWest());
          } else {
            let polygon = L.polygon(bounds);
            if (polygon.contains(layer.getLatLng())) {
              polygon
                .setStyle({ color: '#FF0000', opacity: 0.6, fillOpacity: 0.2 })
                .addTo(this.map);
            }
          }
        });
      } else {
        // other draw element
        // this.map.fitBounds(layer.getBounds()); //zoom the new layer
        // if (localStorage.getItem('points')) {
        const value: unknown = { bounds: layer.getLatLngs(), type: type };
        //   // let data = JSON.parse(localStorage.getItem('points'));
        //   data.push(value);
        // localStorage.setItem('points', JSON.stringify(data));
        // } else {
        //   const value: unknown = [{ bounds: layer.getLatLngs(), type: type }];
        //   localStorage.setItem('points', JSON.stringify(value));
        // }

        this.overviewDetails = { value, id };
        this.onSaveGeofence();
        // drawnItems.addLayer(layer);
        // layer.bindPopup(template).openPopup();
      }
      this.map.addLayer(layer);
    });
  }

  getName = function (layer): any {
    var code = prompt('please, enter the geofencing code');
    return code;
  };
}
