import matter from 'gray-matter';
import yaml from 'yaml';
import type { Meta, Vendor } from './types.js';

const metaRaw = import.meta.glob('/data/_meta.yaml', { eager: true, query: '?raw', import: 'default' }) as Record<string, string>;
const vendorRaw = import.meta.glob('/data/*.md', { eager: true, query: '?raw', import: 'default' }) as Record<string, string>;

export function loadMeta(): Meta {
	const raw = Object.values(metaRaw)[0];
	return yaml.parse(raw) as Meta;
}

export function loadVendors(): Vendor[] {
	return Object.values(vendorRaw).map((raw) => {
		const { data, content } = matter(raw);
		return {
			...data.vendor,
			extensions: data.extensions ?? [],
			prose: content.trim()
		} as Vendor;
	});
}
