export interface Source {
	label: string;
	url: string;
}

export interface Availability {
	status: string;
	claimStrength: string;
	notes: string;
}

export interface Extension {
	name: string;
	normalizedFamily: string;
	vendorTerms: string[];
	scopes: string[];
	interfaces: string[];
	availability: Availability;
	trustModel: string;
	sources: Source[];
}

export interface Vendor {
	id: string;
	name: string;
	interfaces: string[];
	extensions: Extension[];
	prose: string;
}

export interface FamilyDef {
	id: string;
	label: string;
	description: string;
}

export interface ScopeDef {
	id: string;
	label: string;
}

export interface ClaimStrengthDef {
	id: string;
	label: string;
}

export interface Meta {
	lastUpdated: string;
	families: FamilyDef[];
	scopes: ScopeDef[];
	claimStrengths: ClaimStrengthDef[];
}
