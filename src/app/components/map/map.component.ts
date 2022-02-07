import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

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
  map: any;

  references = [
    { point: [6.46, 3.39], name: 'Device 1' },
    { point: [9.07, 7.39], name: 'Device 2' },
    { point: [4.87, 6.97], name: 'Device 3' },
    { point: [4.87, 6.97], name: 'Show Geofencing' },
  ];
  constructor(private fb: FormBuilder) {}
  ngOnInit(): void {
    this.reference.patchValue({ point: this.references[0] });
    this.mapLoad(this.references[0].point); //initial location on map view
    console.log(localStorage.getItem('points'));
  }

  updateLocation() {
    // remove the amap layer
    if (this.map != undefined) {
      this.map.remove();
    }
    this.mapLoad(this.reference.value.point.point);
    // load geofencing data local storage
    if (this.reference.value.point.name === 'Show Geofencing') {
      let data = JSON.parse(localStorage.getItem('points'));
      // loop over the data and and display geofencing type
      data.forEach(({ bounds, type, radius }) => {
        if (type === 'rectangle') {
          L.rectangle(bounds, {
            color: '#FF0000',
            opacity: 0.6,
            fillOpacity: 0.2,
          }).addTo(this.map);
        } else if (type === 'polyline') {
          L.polyline(bounds, {
            color: '#FF0000',
            opacity: 0.6,
            fillOpacity: 0.2,
          }).addTo(this.map);
        } else if (type === 'polygon') {
          L.polygon(bounds, {
            color: '#FF0000',
            opacity: 0.6,
            fillOpacity: 0.2,
          }).addTo(this.map);
        } else {
          L.circle(bounds, {
            color: '#FF0000',
            opacity: 0.6,
            fillOpacity: 0.2,
            radius: radius,
          }).addTo(this.map);
        }
      });
    }
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
        marker: true,
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
      // handle circle differently
      if (type === 'circle') {
        if (localStorage.getItem('points')) {
          const value: unknown = {
            bounds: layer.getLatLng(),
            type: type,
            radius: layer.getRadius(),
          };
          layer.bindPopup('Text');
          data.push(value);
          localStorage.setItem('points', JSON.stringify(data));
        } else {
          const value: unknown = [
            {
              bounds: layer.getLatLng(),
              type: type,
              radius: layer.getRadius(),
            },
          ];
          localStorage.setItem('points', JSON.stringify(value));
        }
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
        if (localStorage.getItem('points')) {
          const value: unknown = { bounds: layer.getLatLngs(), type: type };
          // let data = JSON.parse(localStorage.getItem('points'));
          data.push(value);
          localStorage.setItem('points', JSON.stringify(data));
        } else {
          const value: unknown = [{ bounds: layer.getLatLngs(), type: type }];
          localStorage.setItem('points', JSON.stringify(value));
        }
      }
      this.map.addLayer(layer);
    });
  }
}
