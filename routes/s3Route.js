// const express = require('express');
// const AWS = require('aws-sdk');
// const fs = require('fs');
// const fileType = require('file-type');
// const multiparty = require('multiparty');

import express from 'express';
import AWS from 'aws-sdk';
import fs from 'fs';
import {fileTypeFromFile} from 'file-type';
import multiparty from 'multiparty';
const Router = express.Router();

// configure the keys for accessing AWS
AWS.config.update({
  accessKeyId: "AKIARDIC45P7NUJ437JY",
  secretAccessKey: "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",
});

// create S3 instance
const s3 = new AWS.S3();

// abstracts function to upload a file returning a promise
// NOTE: if you are using TypeScript the typed function signature will be
// const uploadFile = (buffer: S3.Body, name: string, type: { ext: string; mime: string })
const uploadFile = (buffer, name, type) => {
  const params = {
    ACL: 'public-read',
    Body: buffer,
    Bucket: 'testcareerlift',
    ContentType: type.mime,
    Key: `${name}.${type.ext}`,
  };
  return s3.upload(params).promise();
};

// Define POST route
Router.post('/test-upload', (request, response) => {
  const form = new multiparty.Form();
  form.parse(request, async (error, fields, files) => {
    if (error) {
      return response.status(500).send(error);
    };
    try {
      const path = files.file[0].path;
      const buffer = fs.readFileSync(path);
      const type = await fileTypeFromFile.fromBuffer(buffer);
      const fileName = `testpdf/${Date.now().toString()}`;
      const data = await uploadFile(buffer, fileName, type);
      return response.status(200).send(data);
    } catch (err) {
      return response.status(500).send(err);
    }
  });
});

export default Router;