/**
 * Copyright 2020, MessengerUp All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

const mongoose = require('mongoose')

var Repo = new mongoose.Schema({
  user: {
      type : mongoose.Schema.Types.ObjectId,
      ref : 'User'
  },
  json: Object,
  deployed: Boolean,
  session: {
    type: String,
    unique: true
  },
  created: {
    type: Date,
    default: new Date()
  },
}, {
  versionKey: false
})

Repo.index({ session: 1 }, { unique: true })

Repo.set('toObject', {
  transform : function(doc, ret, options) {
    delete ret._id
    delete ret.user
    delete ret.session
  }
})

exports.Repo = mongoose.model('Repo', Repo)
