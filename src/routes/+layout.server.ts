import { getMeta, getAllVendors } from '$lib/data/index.js';
import type { LayoutServerLoad } from './$types.js';

export const load: LayoutServerLoad = () => {
	const meta = getMeta();
	const vendors = getAllVendors();
	return {
		nav: {
			vendors: vendors.map((v) => ({ id: v.id, name: v.name })),
			families: meta.families.map((f) => ({ id: f.id, label: f.label })),
			lastUpdated: meta.lastUpdated
		}
	};
};
