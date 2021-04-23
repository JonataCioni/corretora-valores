export enum EventType {
	DEPOSIT = 'DEPOSIT',
	DRAFT = 'DRAFT'
}

export enum EventStatus {
	NONPROCESSED = 'NONPROCESSED',
	PROCESSED = 'PROCESSED'
}

export enum AssetType {
	ON = 'ON',
	PN = 'PN',
	PNA = 'PNA',
	PNB = 'PNB',
	UNIT = 'UNIT',
	FII = 'FII',
	CALL = 'CALL',
	PUT = 'PUT'
}

export enum OperationType {
	BUY = 'BUY',
	SELL = 'SELL'
}

export enum OperationStatusType {
	PENDING = 'PENDING',
	PRTEXEC = 'PRTEXEC',
	TTLEXEC = 'TTLEXEC',
	REJECTD = 'REJECTD',
	PRTCCLD = 'PRTCCLD',
	TTLCCLD = 'TTLCCLD'
}
