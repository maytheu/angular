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
  map: any;

  references = [
    { point: [6.46, 3.39], name: 'Device 1' },
    { point: [9.07, 7.39], name: 'Device 2' },
    { point: [4.87, 6.97], name: 'Device 3' },
  ];
  constructor(private fb: FormBuilder) {}
  ngOnInit(): void {
    this.reference.patchValue({ point: this.references[0] });
    console.log(this.references[0].point);

    this.mapLoad(this.references[0].point);

    // let map = L.map('map-test').setView([51.505, -0.09], 12);
    // L.tileLayer(
    //   'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw',
    //   {
    //     maxZoom: 18,
    //     attribution:
    //       'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, ' +
    //       'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    //     id: 'mapbox/streets-v11',
    //     tileSize: 512,
    //     zoomOffset: -1,
    //   }
    // ).addTo(map);

    // var locations = [
    //   { latitude: 6.46, longitude: 3.39 },
    //   { latitude: 9.07, longitude: 7.39 },
    //   { latitude: 4.87, longitude: 6.97 },
    //   { latitude: 7.37, longitude: 3.94 },
    // ];
    // // this.getBounds(locations);

    // var minlat = 200,
    //   minlon = 200,
    //   maxlat = -200,
    //   maxlon = -200;

    // locations.forEach(function (d, i) {
    //   if (d.latitude != null && d.latitude != undefined) {
    //     // add a Leaflet marker for the lat lng and insert the application's stated purpose in popup\
    //     //var mark = L.marker([d.latitude, d.longitude]);
    //     //markersLayer.addLayer(mark);
    //     //clusterLayer.addLayer(mark);

    //     // find corners
    //     if (minlat > d.latitude) minlat = d.latitude;
    //     if (minlon > d.longitude) minlon = d.longitude;
    //     if (maxlat < d.latitude) maxlat = d.latitude;
    //     if (maxlon < d.longitude) maxlon = d.longitude;

    //     // set markers
    //     L.marker([d.latitude, d.longitude]).addTo(map);
    //   }
    // });

    // const c1 = L.latLng(minlat, minlon);
    // const c2 = L.latLng(maxlat, maxlon);

    // // fit bounds
    // map.fitBounds(L.latLngBounds(c1, c2));

    // // correct zoom to fit markers
    // setTimeout(function () {
    //   map.setZoom(map.getZoom() - 1);
    // }, 500);
  }

  updateLocation() {
    if (this.map != undefined) {
      this.map.remove();
    }
    // this.reference.patchValue({ point: this.references[0] });
    // let points = [this.references[0].point];
    // points.push(this.reference.value.point.point);
    // console.log(points);

    // this.getBounds(points);
    // this.mapLoad(this.references[0].point);
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
      draw: {
        position: 'topleft',
        polygon: false,
        polyline: true,
        rectangle: true,
        circle: false,
        marker: false,
        circlemarker: false,
      },
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
        console.log(layer.toGeoJSON().geometry.coordinates);
        this.map.fitBounds(
          L.latLngBounds(layer.toGeoJSON().geometry.coordinates)
        );
        // this.map.fitBounds(
        //   L.latLngBounds(event.layer._latlng.D.lat, event.layer._latlng.D.lng)
        // );
      } else {
        console.log(layer.getBounds(), 'bounds');
        console.log(
          layer
            .getLatLngs()
            .join(',')
            .match(/([\d\.]+)/g)
            .join(','),
          'latnlng'
        );

        // this.getBounds(layer.toGeoJSON().geometry.coordinates);
        // this.map.addLayer(drawnItems);
        this.map.fitBounds(layer.getBounds());
      }
      // Do whatever else you need to. (save to db; add to map etc)
      this.map.addLayer(layer);

      // this.getBounds(point);
    });
  }

  getBounds(locs) {
    var minlat = 200,
      minlon = 200,
      maxlat = -200,
      maxlon = -200;

    locs.forEach(function (d, i) {
      if (d.latitude != null && d.latitude != undefined) {
        // add a Leaflet marker for the lat lng and insert the application's stated purpose in popup\
        //var mark = L.marker([d.latitude, d.longitude]);
        //markersLayer.addLayer(mark);
        //clusterLayer.addLayer(mark);

        // find corners
        if (minlat > d.latitude) minlat = d.latitude;
        if (minlon > d.longitude) minlon = d.longitude;
        if (maxlat < d.latitude) maxlat = d.latitude;
        if (maxlon < d.longitude) maxlon = d.longitude;

        // set markers
        L.marker([d.latitude, d.longitude]).addTo(this.map);
      }
    });

    const c1 = L.latLng(minlat, minlon);
    const c2 = L.latLng(maxlat, maxlon);

    // fit bounds
    this.map.fitBounds(L.latLngBounds(c1, c2));

    // correct zoom to fit markers
    setTimeout(function () {
      this.map.setZoom(this.map.getZoom() - 1);
    }, 500);
  }
}
