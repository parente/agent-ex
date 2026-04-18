import { loadMeta, loadVendors } from './loader.js';
import type { Meta, Vendor, Extension, FamilyDef } from './types.js';

export function getMeta(): Meta {
	return loadMeta();
}

export function getAllVendors(): Vendor[] {
	return loadVendors();
}

export function getVendor(id: string): Vendor | undefined {
	return loadVendors().find((v) => v.id === id);
}

export function getFamily(id: string): FamilyDef | undefined {
	return loadMeta().families.find((f) => f.id === id);
}

export function getExtensionsByFamily(familyId: string): { vendor: Vendor; extension: Extension }[] {
	return loadVendors().flatMap((v) =>
		v.extensions
			.filter((e) => e.normalizedFamily === familyId)
			.map((e) => ({ vendor: v, extension: e }))
	);
}

export function getScopeLabel(id: string): string {
	return loadMeta().scopes.find((s) => s.id === id)?.label ?? id;
}

export function getFamilyLabel(id: string): string {
	return loadMeta().families.find((f) => f.id === id)?.label ?? id;
}
