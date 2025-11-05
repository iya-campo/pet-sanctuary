import formidable from 'formidable';
import fs from 'fs';
import path from 'path';

export const config = {
  api: {
    bodyParser: false, // Disable Next.js body parser
  },
};

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const form = new formidable.IncomingForm();
    form.uploadDir = path.join(process.cwd(), 'public/uploads');
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
      if (err) {
        return res.status(500).json({ error: 'Something went wrong' });
      }
      // Save the file path
      const filePath = files.file[0].filepath;
      res.status(200).json({ filePath: `/uploads/${path.basename(filePath)}` });
    });
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}