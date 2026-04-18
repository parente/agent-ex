import { getVendor, getMeta } from '$lib/data/index.js';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types.js';

export const load: PageServerLoad = ({ params }) => {
	const vendor = getVendor(params.id);
	if (!vendor) error(404, 'Vendor not found');
	return { vendor, meta: getMeta() };
};
