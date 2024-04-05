import { google } from 'googleapis';

const youtube = google.youtube('v3');

const youtubeService = google.youtube({
  version: 'v3',
  auth: process.env.YOUTUBE_API_KEY,
});

export default youtubeService;