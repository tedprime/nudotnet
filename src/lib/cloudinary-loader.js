export default function cloudinaryLoader({ src, width, quality }) {
  if (!src) return src;
  try {
    const url = String(src);
    // If this is not a Cloudinary URL, return it but include width
    // as a query param so Next's loader width check is satisfied.
    if (!url.includes('res.cloudinary.com') || !url.includes('/upload/')) {
      if (width) {
        const sep = url.includes('?') ? '&' : '?';
        return `${url}${sep}w=${width}`;
      }
      return url;
    }

    const [prefix, rest] = url.split('/upload/');
    if (!rest) return url;

    const parts = rest.split('/');
    // If the first part is a version like "v12345" then there are no transformations
    const first = parts[0] || '';
    const hasTransformation = first && !first.startsWith('v');
    if (hasTransformation) {
      // remove existing transformation segment
      parts.shift();
    }

    const q = quality || 75;
    const wSegment = width ? `w_${width},` : '';
    const transformation = `${wSegment}f_auto,q_${q}`;
    const newRest = [transformation, ...parts].join('/');
    return `${prefix}/upload/${newRest}`;
  } catch (err) {
    return src;
  }
}
