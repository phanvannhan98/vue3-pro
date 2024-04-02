module.exports = {
  '*.{js,jsx,ts,tsx}': ['eslint --quiet', 'prettier --write'],
  '{!(package)*.json,*.code-snippets,.!(browserslist)*rc}': ['prettier --write--parser json'],
  'package.json': ['prettier --write'],
  '*.vue': ['eslint --quiet', 'prettier --write'],
  '*.{scss,less,styl,html}': ['prettier --write'],
};
