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
  // marker = L.marker([7.37, 3.94]);
  reference = this.fb.group({
    point: [null],
  });

  references = [
    { point: [6.46, 3.39], name: 'Device 1' },
    { point: [9.07, 7.39], name: 'Device 2' },
    { point: [4.87, 6.97], name: 'Device 3' },
  ];
  constructor(private fb: FormBuilder) {}
  map;
  ngOnInit(): void {
    this.reference.patchValue({ point: this.references[0] });
    console.log(this.references[0].point);

    this.mapLoad(this.references[0].point);
  }
  updateLocation() {
    if (this.map != undefined) {
      this.map.remove();
    }
    this.mapLoad(this.reference.value.point.point);
  }

  mapLoad(point) {
    this.map = L.map('map-test').setView([7.37, 3.94], 5);
    const t_url = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
    const attribution = '';
    // 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>';
    const tiles = L.tileLayer(t_url, { attribution, maxZoom: 18 });
    tiles.addTo(this.map);
    let marker = L.marker(point);
    marker.addTo(this.map);

    let drawnItems = new L.FeatureGroup();
    this.map.addLayer(drawnItems);
    let drawControl = new L.Control.Draw({
      edit: {
        featureGroup: drawnItems,
      },
    });

    this.map.addControl(drawControl);

    this.map.on(L.Draw.Event.CREATED, (event) => {
      var type = event.layerType,
        layer = event.layer;

      if (type === 'marker') {
        // Do marker specific actions
        console.log(event.layer._latlng);
      } else {
        console.log(event.layer._bounds.R);
      }
      // Do whatever else you need to. (save to db; add to map etc)
      this.map.addLayer(layer);
    });
  }
}
