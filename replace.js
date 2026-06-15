const fs = require('fs');
const path = require('path');

const replacements = {
  '1507679622778-81711e50f594': '1554224155-6726b3ff858f',
  '1450101499163-c8848c66cb85': '1517245386807-bb43f82c33c4',
  '1512438248247-f0f6071424ac': '1521737604893-d14cc237f11d',
  '1577563908411-50cb98976fea': '1497215728101-856f4ea42174',
  '1572010696954-46c59b2184e9': '1497366216548-37526070297c'
};

function processDir(dir) {
  const files = fs.readdirSync(dir);
  for (const f of files) {
    const p = path.join(dir, f);
    if (fs.statSync(p).isDirectory()) {
      if (f !== '.git') processDir(p);
    } else if (p.endsWith('.html')) {
      let content = fs.readFileSync(p, 'utf-8');
      let changed = false;
      for (const [bad, good] of Object.entries(replacements)) {
        if (content.includes(bad)) {
          content = content.split(bad).join(good);
          changed = true;
        }
      }
      if (changed) {
        fs.writeFileSync(p, content, 'utf-8');
        console.log('Fixed:', p);
      }
    }
  }
}

processDir('.');
console.log('Done.');
