import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import authRoute from './routes/auth.js';
import achiveRoute from './routes/achievement.js';
import alertRoute from './routes/alert.js';
import batchRoute from './routes/batch.js';
import blogRoute from './routes/blogs.js';
import courseRoute from './routes/course.js';
import coreFeaturesRoute from './routes/coreFeatures.js';
import downloadsRoute from './routes/downloads.js';
import enquriesRoute from './routes/enquries.js';
import facultyDetailsRoute from './routes/facultyDetails.js';
import faqsRoute from './routes/faqs.js';
import imageRoute from './routes/image.js';
import imagePopRoute from './routes/imagePop.js';
import institute_detailRoute from './routes/institute_detail.js';
import seoRoute from './routes/seo.js';
import sliderRoute from './routes/slider.js';
import socialLinksRoute from './routes/socialLinks.js';
import testimonialRoute from './routes/testimonial.js';
import videoRoute from './routes/video.js';
import websiteColorRoute from './routes/websiteColor.js';
import basicQuestionRoute from './routes/basicQuestion.js';
import s3Bucket from './routes/s3Route.js';
// import loginRoute from './routes/login.js';
import pdfRoute from './routes/pdf.js';
import notificationRoute from './routes/notification.js';
import contactRoute from './routes/contact.js';
// import domainRoute from './routes/domain.js';
import messageRoute from './routes/message.js';
import aboutRoute from './routes/aboutus.js';
import courseSeqnoRoute from './routes/courseSeqno.js';
import fileUploadRoute from  "./routes/fileUpload.js";
import packageRoute from  "./routes/package.js";
import resourcesRoute from  "./routes/resources.js";


const app = express()
const PORT = process.env.PORT || 5000
app.use(cors());
// parse requests of content-type - application/json
app.use(bodyParser.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// simple route
app.get("/", (req, res) => {
  res.json({ message: "welcome to speedlabs" });
});
app.use('/authentication',authRoute);
app.use('/apiaboutus',aboutRoute);
app.use('/apiachievement',achiveRoute);
app.use('/apiaboutus',aboutRoute);
app.use('/apialert',alertRoute);
app.use('/apibatch',batchRoute);
app.use('/apiblogs',blogRoute);
app.use('/apibasicQuestion',basicQuestionRoute);
app.use('/apicoreFeature',coreFeaturesRoute);
app.use('/apicourse',courseRoute);
app.use('/apidownloads',downloadsRoute);
app.use('/apienquries',enquriesRoute);
app.use('/apifacultyDetails',facultyDetailsRoute);
app.use('/apifaqs',faqsRoute);
app.use('/apiimage',imageRoute);
app.use('/apiimagePop',imagePopRoute);
app.use('/apiinstitute_detail',institute_detailRoute);
// app.use('/apilogin',loginRoute);
app.use('/apimessage',messageRoute);
app.use('/apinotification',notificationRoute);
app.use('/apipdf',pdfRoute);
app.use('/apiseo',seoRoute);
app.use('/apislider',sliderRoute);
app.use('/apisocialLinks',socialLinksRoute);
app.use('/apitestimonial',testimonialRoute);
app.use('/apivideo',videoRoute);
app.use('/apiwebsiteColor',websiteColorRoute);
app.use('/apicontact',contactRoute);
app.use('/upload',s3Bucket);
app.use('/apicourseSeqno',courseSeqnoRoute);
app.use('/apifileUpload',fileUploadRoute);
app.use('/apipackage',packageRoute);
app.use('/apiresources',resourcesRoute);



// app.use('/apidomain',domainRoute);
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
  });