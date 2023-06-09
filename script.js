** methods/reviews.deleteAppReview replace the _deleted key for isDeleted to keep it in concordance with the other colections. Also make sure to add that key to the reviews schema (schema.ReviewSchema)
— This should be completed in my local commit, have not made PR for this one yet

** Add schema for OrgSpecials collection
— schemas for ALL collections are in imports/both/schema.js
— use the specialsJsonSchema.js file as a general guideline for keys/values that need to be in the collection schema

* all collection schemas are in schema.js
* see imports/both/methods/reviews.js for an example of using the Reviews collection schema

        inside schema.js:

  export const ReviewSchema = new SimpleSchema({
    _id: String,
    ...
  });
  ReviewSchema.extend(TimestampSchema); // <-- adds createdOn date props
  Reviews.attachSchema(ReviewSchema); // <-- look! this line is attaching ReviewSchema to the following collection obj (from imports/both/collections/js   vvv
 // export const Reviews = hookAddCreatedAtAndModifiedAt(new Mongo.Collection('reviews'));

inside manage.vue component, when we submit a special, here is what is sent to upsertOrgSpecial.callPromise ->
{
  "org_id": "jMsfzXKnghAfAazxf",
  "frequency": "always",
  "delay": "0",
  "cacheIdKey": "E8iFD",
  "allPages": false,
  "property_ids": [
    "kSRnTRxa4aM3fQ63i",
    "3YcJ2RZRXzX6L5fuB",
    "MBzeRiLaDrCz8QZnu"
  ],
  "publish": {
    "status": "date_range",
    "from": "2021-12-07T21:16:40.701Z",
    "until": "2022-01-07T21:16:40.701Z"
  },
  "selectPages": [
    "home",
    "building"
  ],
  "template": "primary",
  "content": {
    "title": "Foo Bar",
    "description": "Lorem Ipsum Dolor Sic Amet",
    "buttonText": "Apply Today!",
    "disclaimer": "",
    "disclaimerEnabled": false,
    "buttonLink": "",
    "buttonType": "regular",
    "buttonColor": "primaryColor",
    "image": "",
    "backgroundColor": "#D8D8D8"
  }
}







  ----- Keys needed -----

_id: (filled out by Mongo, no need to specify?)
allPages: Boolean
cacheIdKey: generated by page?
content: {
  title: string REQUIRED, no default,
  description: string REQUIRED, no default,
  buttonText: string REQUIRED, default "Apply Now",
  disclaimer: string, can be empty if disclaimerEnabled is false
  disclaimerEnabled: boolean, default is FALSE
  buttonAction: enum? REQUIRED, default="external_url"
  buttonLink: url string, REQD if buttonAction="external_url"
  buttonType: enum? REQD, default="regular"
  buttonColor: enum? REQD, [primaryColor, secondaryColor, custom]
  background: enum, REQD, default="color"
 // image: 2nd option for background, disabled for now
  backgroundColor: hex code string, REQD if background="color"
},
created_at: ISODate, (provided by TimestampSchema)
delay: integer? string?,
frequency: enum? (always, once, hour, once a month, etc)
org_id: pull from this
property_ids: [ array of app_ids ]
publish: {
  status: "date_range"
  from: ISODate
  until: ISODate
}
selectPages: [
  ARRAY enum? [home, gallery, units, etc]
]
template: string?
updated_at: ISODate (provided by TimestampSchema)
version: Number/Int

____________________________________________________


EXAMPLE of single document in OrgSpecials collection:
{
  "_id" : "ZFQbq99CPCojgANeH",
  "allPages" : false,
  "cacheIdKey" : "YsLou",
  "content" : {
    "title" : "Super Special Deal",
    "description" : "All new, one time offer!",
    "buttonText" : "Apply Today!",
    "disclaimer" : "",
    "disclaimerEnabled" : false,
    "buttonLink" : "www.not-a-real-url.com",
    "buttonType" : "regular",
    "buttonColor" : "primaryColor",
    "image" : "",
    "backgroundColor" : "#D8D8D8"
},
  "created_at" : ISODate("2021-12-07T17:43:47.638+0000"),
  "delay" : "0",
  "frequency" : "always",
  "org_id" : "jMsfzXKnghAfAazxf",
  "property_ids" : [
  "3YcJ2RZRXzX6L5fuB",
  "MG3wLqPAx4mbxtFT6",
  "mwuGJX6HhtYKhQS7k"
],
  "publish" : {
    "status" : "date_range",
    "from" : ISODate("2021-12-07T17:43:27.753+0000"),
    "until" : ISODate("2022-01-07T17:43:27.753+0000")
},
  "selectPages" : [
  "home"
],
  "template" : "primary",
  "updated_at" : ISODate("2021-12-07T17:45:11.738+0000"),
  "version" : NumberInt(2)
}

ANOTHER EXAMPLE of a single document in OrgSpecials collection:
{
  "_id" : "Xv8Qhp7nLaRbKiwCZ",
  "allPages" : true,
  "cacheIdKey" : "gkQSD",
  "content" : {
  "title" : "Limited Time Only",
    "description" : "Get special thing for a limited time only!",
    "buttonText" : "Apply Here Now",
    "disclaimer" : "Offer not valid in any state",
    "disclaimerEnabled" : true,
    "buttonLink" : "www.this-is-not-a-url.com",
    "buttonType" : "regular",
    "buttonColor" : "secondaryColor",
    "image" : "",
    "backgroundColor" : "#BBBBBB"
},
  "created_at" : ISODate("2021-12-07T20:25:40.592+0000"),
  "delay" : "60",
  "frequency" : "hour",
  "org_id" : "jMsfzXKnghAfAazxf",
  "property_ids" : [
  "3YcJ2RZRXzX6L5fuB",
  "MG3wLqPAx4mbxtFT6",
  "mwuGJX6HhtYKhQS7k"
],
  "publish" : {
  "status" : "date_range",
    "from" : ISODate("2021-12-07T20:24:42.155+0000"),
    "until" : ISODate("2022-01-07T20:24:42.155+0000")
},
  "template" : "primary",
  "updated_at" : ISODate("2021-12-07T20:25:40.592+0000"),
  "version" : NumberInt(1)
}



org_id:"jMsfzXKnghAfAazxf"
frequency:"always"
delay:"0"
cacheIdKey:"oGsZK"
allPages:true
property_ids: {
  0:"McpXzRwXSb7StX3bB"
  1:"3YcJ2RZRXzX6L5fuB"
}
publish: {
  status:"date_range"
  from: { $date:1638991051230 }
  to: { $date:1641669451230 }
}
template:"primary"
content: {
  title:"Tabula Rasa"
  description:"not sure what this means"
  buttonText:"Apply Today!"
  disclaimer:""
  disclaimerEnabled:false
  buttonLink:"www.not-a-real-url.com"
  buttonType:"regular"
  buttonColor:"primaryColor"
  image:""
  backgroundColor:"#D8D8D8"
}
