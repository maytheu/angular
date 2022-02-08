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
  overviewDetails: unknown;
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
    data.forEach(({ data, details }) => {
      const { type, radius, bounds } = data;
      const { describe } = details;
      if (type === 'rectangle') {
        L.rectangle(bounds, {
          color: '#FF0000',
          opacity: 0.6,
          fillOpacity: 0.2,
        })
          .addTo(this.map)
          .bindPopup(describe);
      } else if (type === 'polyline') {
        L.polyline(bounds, {
          color: '#FF0000',
          opacity: 0.6,
          fillOpacity: 0.2,
        })
          .addTo(this.map)
          .bindPopup(describe);
      } else if (type === 'polygon') {
        L.polygon(bounds, {
          color: '#FF0000',
          opacity: 0.6,
          fillOpacity: 0.2,
        })
          .addTo(this.map)
          .bindPopup(describe);
      } else {
        L.circle(bounds, {
          color: '#FF0000',
          opacity: 0.6,
          fillOpacity: 0.2,
          radius: radius,
        })
          .addTo(this.map)
          .bindPopup(describe);
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
      data.forEach(({ data, details }) => {
        const { bounds, radius } = data;
        const { describe } = details;
        if (radius) {
          if (marker.getLatLng().distanceTo(bounds) <= radius) {
            msg = `${point[0]}° N, ${point[1]}° E lies within the ${describe} geofence`;
          } else {
            msg = `${point[0]}° N, ${point[1]}° E does not lies within the ${describe} geofence`;
          }
        } else {
          let polygon = L.polygon(bounds);
          if (polygon.contains(marker.getLatLng())) {
            msg = `${point[0]}° N, ${point[1]}° E lies within the ${describe} geofence`;
          } else {
            msg = `${point[0]}° N, ${point[1]}° E does not lies within the ${describe} geofence`;
          }
        }
        this.geofencinggMsg.push(msg);

        // if (radius && marker.getLatLng().distanceTo(bounds) <= radius) {
        //   msg = `${point[0]}° N, ${point[1]}° E lies within the ${describe} geofence`;
        //   this.geofencinggMsg.push(msg);
        // }
        // let polygon = L.polygon(bounds);
        // if (!radius && polygon.contains(marker.getLatLng())) {
        //   msg = `${point[0]}° N, ${point[1]}° E lies within the ${describe} geofence`;
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

  mapLoad(point) {
    this.map = L.map('map-test').setView([7.37, 3.94], 5);
    const t_url = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
    const attribution = '';
    ('Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>');
    const tiles = L.tileLayer(t_url, { attribution, maxZoom: 18 });
    tiles.addTo(this.map);
    let marker = L.marker(point);
    marker.addTo(this.map);

    let drawnItems = new L.FeatureGroup();
    this.map.addLayer(drawnItems);
    let drawControl = new L.Control.Draw({
      draw: {
        position: 'topleft',
        polygon: true,
        polyline: true,
        rectangle: true,
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
      // handle circle differently
      if (type === 'circle') {
        const value: unknown = {
          bounds: layer.getLatLng(),
          type: type,
          radius: layer.getRadius(),
        };
        this.overviewDetails = value;
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
        this.map.fitBounds(layer.getBounds()); //zoom the new layer
        // if (localStorage.getItem('points')) {
        const value: unknown = { bounds: layer.getLatLngs(), type: type };
        //   // let data = JSON.parse(localStorage.getItem('points'));
        //   data.push(value);
        // localStorage.setItem('points', JSON.stringify(data));
        // } else {
        //   const value: unknown = [{ bounds: layer.getLatLngs(), type: type }];
        //   localStorage.setItem('points', JSON.stringify(value));
        // }
        this.overviewDetails = value;
      }
      this.map.addLayer(layer);
    });
  }
}
