import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import yaml from 'yaml';
import type { Meta, Vendor } from './types.js';

const dataDir = path.resolve('data');

export function loadMeta(): Meta {
	const raw = fs.readFileSync(path.join(dataDir, '_meta.yaml'), 'utf-8');
	return yaml.parse(raw) as Meta;
}

export function loadVendors(): Vendor[] {
	const files = fs.readdirSync(dataDir).filter((f) => f.endsWith('.md'));
	return files.map((f) => {
		const raw = fs.readFileSync(path.join(dataDir, f), 'utf-8');
		const { data, content } = matter(raw);
		return {
			...data.vendor,
			extensions: data.extensions ?? [],
			prose: content.trim()
		} as Vendor;
	});
}
