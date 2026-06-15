const fs = require('fs');
const path = require('path');
const https = require('https');

const blogDir = './blog';
const files = fs.readdirSync(blogDir).filter(f => f.endsWith('.html'));
files.push('index.html'); // Add the main index if needed, or it's just ./blog/index.html

const urls = new Set();
files.forEach(f => {
  const content = fs.readFileSync(path.join(blogDir, f), 'utf-8');
  const matches = content.matchAll(/src="(https:\/\/images\.unsplash\.com\/[^"]+)"/g);
  for (const match of matches) {
    urls.add(match[1]);
  }
});

async function checkUrl(url) {
  return new Promise((resolve) => {
    https.get(url, (res) => {
      resolve({ url, status: res.statusCode });
      res.resume();
    }).on('error', (e) => {
      resolve({ url, status: 500 });
    });
  });
}

(async () => {
  const arr = Array.from(urls);
  for (const url of arr) {
    const { status } = await checkUrl(url);
    if (status !== 200 && status !== 302 && status !== 301) {
      console.log('BROKEN:', status, url);
    }
  }
  console.log('Done checking ' + arr.length + ' URLs.');
})();
