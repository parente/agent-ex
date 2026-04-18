import { getFamily, getExtensionsByFamily, getMeta, getAllVendors } from '$lib/data/index.js';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types.js';

export const load: PageServerLoad = ({ params }) => {
	const family = getFamily(params.id);
	if (!family) error(404, 'Family not found');
	const entries = getExtensionsByFamily(params.id);
	const vendors = getAllVendors();
	return { family, entries, vendors, meta: getMeta() };
};
