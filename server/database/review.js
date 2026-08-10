/* jshint esversion: 8 */
const express = require('express');
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const review = new Reviews({
  "id": new_id,
  "name": data.name,
  "dealership": data.dealership,
  "review": data.review,
  "purchase": data.purchase,
  "purchase_date": data.purchase_date,
  "car_make": data.car_make,
  "car_model": data.car_model,
  "car_year": data.car_year,
});

module.exports = mongoose.model('reviews', reviews);
