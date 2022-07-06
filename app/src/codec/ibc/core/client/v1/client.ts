/* eslint-disable */
import { messageTypeRegistry } from '../../../../typeRegistry';
import { Any } from '../../../../google/protobuf/any';
import { Plan } from '../../../../cosmos/upgrade/v1beta1/upgrade';
import Long from 'long';
import * as _m0 from 'protobufjs/minimal';

export const protobufPackage = 'ibc.core.client.v1';

/**
 * IdentifiedClientState defines a client state with an additional client
 * identifier field.
 */
export interface IdentifiedClientState {
	$type: 'ibc.core.client.v1.IdentifiedClientState';
	/** client identifier */
	clientId: string;
	/** client state */
	clientState?: Any;
}

/**
 * ConsensusStateWithHeight defines a consensus state with an additional height
 * field.
 */
export interface ConsensusStateWithHeight {
	$type: 'ibc.core.client.v1.ConsensusStateWithHeight';
	/** consensus state height */
	height?: Height;
	/** consensus state */
	consensusState?: Any;
}

/**
 * ClientConsensusStates defines all the stored consensus states for a given
 * client.
 */
export interface ClientConsensusStates {
	$type: 'ibc.core.client.v1.ClientConsensusStates';
	/** client identifier */
	clientId: string;
	/** consensus states and their heights associated with the client */
	consensusStates: ConsensusStateWithHeight[];
}

/**
 * ClientUpdateProposal is a governance proposal. If it passes, the substitute
 * client's latest consensus state is copied over to the subject client. The proposal
 * handler may fail if the subject and the substitute do not match in client and
 * chain parameters (with exception to latest height, frozen height, and chain-id).
 */
export interface ClientUpdateProposal {
	$type: 'ibc.core.client.v1.ClientUpdateProposal';
	/** the title of the update proposal */
	title: string;
	/** the description of the proposal */
	description: string;
	/** the client identifier for the client to be updated if the proposal passes */
	subjectClientId: string;
	/**
	 * the substitute client identifier for the client standing in for the subject
	 * client
	 */
	substituteClientId: string;
}

/**
 * UpgradeProposal is a gov Content type for initiating an IBC breaking
 * upgrade.
 */
export interface UpgradeProposal {
	$type: 'ibc.core.client.v1.UpgradeProposal';
	title: string;
	description: string;
	plan?: Plan;
	/**
	 * An UpgradedClientState must be provided to perform an IBC breaking upgrade.
	 * This will make the chain commit to the correct upgraded (self) client state
	 * before the upgrade occurs, so that connecting chains can verify that the
	 * new upgraded client is valid by verifying a proof on the previous version
	 * of the chain. This will allow IBC connections to persist smoothly across
	 * planned chain upgrades
	 */
	upgradedClientState?: Any;
}

/**
 * Height is a monotonically increasing data type
 * that can be compared against another Height for the purposes of updating and
 * freezing clients
 *
 * Normally the RevisionHeight is incremented at each height while keeping
 * RevisionNumber the same. However some consensus algorithms may choose to
 * reset the height in certain conditions e.g. hard forks, state-machine
 * breaking changes In these cases, the RevisionNumber is incremented so that
 * height continues to be monitonically increasing even as the RevisionHeight
 * gets reset
 */
export interface Height {
	$type: 'ibc.core.client.v1.Height';
	/** the revision that the client is currently on */
	revisionNumber: Long;
	/** the height within the given revision */
	revisionHeight: Long;
}

/** Params defines the set of IBC light client parameters. */
export interface Params {
	$type: 'ibc.core.client.v1.Params';
	/** allowed_clients defines the list of allowed client state types. */
	allowedClients: string[];
}

function createBaseIdentifiedClientState(): IdentifiedClientState {
	return {
		$type: 'ibc.core.client.v1.IdentifiedClientState',
		clientId: '',
		clientState: undefined
	};
}

export const IdentifiedClientState = {
	$type: 'ibc.core.client.v1.IdentifiedClientState' as const,

	encode(message: IdentifiedClientState, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
		if (message.clientId !== '') {
			writer.uint32(10).string(message.clientId);
		}
		if (message.clientState !== undefined) {
			Any.encode(message.clientState, writer.uint32(18).fork()).ldelim();
		}
		return writer;
	},

	decode(input: _m0.Reader | Uint8Array, length?: number): IdentifiedClientState {
		const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
		let end = length === undefined ? reader.len : reader.pos + length;
		const message = createBaseIdentifiedClientState();
		while (reader.pos < end) {
			const tag = reader.uint32();
			switch (tag >>> 3) {
				case 1:
					message.clientId = reader.string();
					break;
				case 2:
					message.clientState = Any.decode(reader, reader.uint32());
					break;
				default:
					reader.skipType(tag & 7);
					break;
			}
		}
		return message;
	},

	fromJSON(object: any): IdentifiedClientState {
		return {
			$type: IdentifiedClientState.$type,
			clientId: isSet(object.clientId) ? String(object.clientId) : '',
			clientState: isSet(object.clientState) ? Any.fromJSON(object.clientState) : undefined
		};
	},

	toJSON(message: IdentifiedClientState): unknown {
		const obj: any = {};
		message.clientId !== undefined && (obj.clientId = message.clientId);
		message.clientState !== undefined &&
			(obj.clientState = message.clientState ? Any.toJSON(message.clientState) : undefined);
		return obj;
	},

	fromPartial<I extends Exact<DeepPartial<IdentifiedClientState>, I>>(
		object: I
	): IdentifiedClientState {
		const message = createBaseIdentifiedClientState();
		message.clientId = object.clientId ?? '';
		message.clientState =
			object.clientState !== undefined && object.clientState !== null
				? Any.fromPartial(object.clientState)
				: undefined;
		return message;
	}
};

messageTypeRegistry.set(IdentifiedClientState.$type, IdentifiedClientState);

function createBaseConsensusStateWithHeight(): ConsensusStateWithHeight {
	return {
		$type: 'ibc.core.client.v1.ConsensusStateWithHeight',
		height: undefined,
		consensusState: undefined
	};
}

export const ConsensusStateWithHeight = {
	$type: 'ibc.core.client.v1.ConsensusStateWithHeight' as const,

	encode(message: ConsensusStateWithHeight, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
		if (message.height !== undefined) {
			Height.encode(message.height, writer.uint32(10).fork()).ldelim();
		}
		if (message.consensusState !== undefined) {
			Any.encode(message.consensusState, writer.uint32(18).fork()).ldelim();
		}
		return writer;
	},

	decode(input: _m0.Reader | Uint8Array, length?: number): ConsensusStateWithHeight {
		const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
		let end = length === undefined ? reader.len : reader.pos + length;
		const message = createBaseConsensusStateWithHeight();
		while (reader.pos < end) {
			const tag = reader.uint32();
			switch (tag >>> 3) {
				case 1:
					message.height = Height.decode(reader, reader.uint32());
					break;
				case 2:
					message.consensusState = Any.decode(reader, reader.uint32());
					break;
				default:
					reader.skipType(tag & 7);
					break;
			}
		}
		return message;
	},

	fromJSON(object: any): ConsensusStateWithHeight {
		return {
			$type: ConsensusStateWithHeight.$type,
			height: isSet(object.height) ? Height.fromJSON(object.height) : undefined,
			consensusState: isSet(object.consensusState) ? Any.fromJSON(object.consensusState) : undefined
		};
	},

	toJSON(message: ConsensusStateWithHeight): unknown {
		const obj: any = {};
		message.height !== undefined &&
			(obj.height = message.height ? Height.toJSON(message.height) : undefined);
		message.consensusState !== undefined &&
			(obj.consensusState = message.consensusState
				? Any.toJSON(message.consensusState)
				: undefined);
		return obj;
	},

	fromPartial<I extends Exact<DeepPartial<ConsensusStateWithHeight>, I>>(
		object: I
	): ConsensusStateWithHeight {
		const message = createBaseConsensusStateWithHeight();
		message.height =
			object.height !== undefined && object.height !== null
				? Height.fromPartial(object.height)
				: undefined;
		message.consensusState =
			object.consensusState !== undefined && object.consensusState !== null
				? Any.fromPartial(object.consensusState)
				: undefined;
		return message;
	}
};

messageTypeRegistry.set(ConsensusStateWithHeight.$type, ConsensusStateWithHeight);

function createBaseClientConsensusStates(): ClientConsensusStates {
	return {
		$type: 'ibc.core.client.v1.ClientConsensusStates',
		clientId: '',
		consensusStates: []
	};
}

export const ClientConsensusStates = {
	$type: 'ibc.core.client.v1.ClientConsensusStates' as const,

	encode(message: ClientConsensusStates, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
		if (message.clientId !== '') {
			writer.uint32(10).string(message.clientId);
		}
		for (const v of message.consensusStates) {
			ConsensusStateWithHeight.encode(v!, writer.uint32(18).fork()).ldelim();
		}
		return writer;
	},

	decode(input: _m0.Reader | Uint8Array, length?: number): ClientConsensusStates {
		const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
		let end = length === undefined ? reader.len : reader.pos + length;
		const message = createBaseClientConsensusStates();
		while (reader.pos < end) {
			const tag = reader.uint32();
			switch (tag >>> 3) {
				case 1:
					message.clientId = reader.string();
					break;
				case 2:
					message.consensusStates.push(ConsensusStateWithHeight.decode(reader, reader.uint32()));
					break;
				default:
					reader.skipType(tag & 7);
					break;
			}
		}
		return message;
	},

	fromJSON(object: any): ClientConsensusStates {
		return {
			$type: ClientConsensusStates.$type,
			clientId: isSet(object.clientId) ? String(object.clientId) : '',
			consensusStates: Array.isArray(object?.consensusStates)
				? object.consensusStates.map((e: any) => ConsensusStateWithHeight.fromJSON(e))
				: []
		};
	},

	toJSON(message: ClientConsensusStates): unknown {
		const obj: any = {};
		message.clientId !== undefined && (obj.clientId = message.clientId);
		if (message.consensusStates) {
			obj.consensusStates = message.consensusStates.map((e) =>
				e ? ConsensusStateWithHeight.toJSON(e) : undefined
			);
		} else {
			obj.consensusStates = [];
		}
		return obj;
	},

	fromPartial<I extends Exact<DeepPartial<ClientConsensusStates>, I>>(
		object: I
	): ClientConsensusStates {
		const message = createBaseClientConsensusStates();
		message.clientId = object.clientId ?? '';
		message.consensusStates =
			object.consensusStates?.map((e) => ConsensusStateWithHeight.fromPartial(e)) || [];
		return message;
	}
};

messageTypeRegistry.set(ClientConsensusStates.$type, ClientConsensusStates);

function createBaseClientUpdateProposal(): ClientUpdateProposal {
	return {
		$type: 'ibc.core.client.v1.ClientUpdateProposal',
		title: '',
		description: '',
		subjectClientId: '',
		substituteClientId: ''
	};
}

export const ClientUpdateProposal = {
	$type: 'ibc.core.client.v1.ClientUpdateProposal' as const,

	encode(message: ClientUpdateProposal, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
		if (message.title !== '') {
			writer.uint32(10).string(message.title);
		}
		if (message.description !== '') {
			writer.uint32(18).string(message.description);
		}
		if (message.subjectClientId !== '') {
			writer.uint32(26).string(message.subjectClientId);
		}
		if (message.substituteClientId !== '') {
			writer.uint32(34).string(message.substituteClientId);
		}
		return writer;
	},

	decode(input: _m0.Reader | Uint8Array, length?: number): ClientUpdateProposal {
		const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
		let end = length === undefined ? reader.len : reader.pos + length;
		const message = createBaseClientUpdateProposal();
		while (reader.pos < end) {
			const tag = reader.uint32();
			switch (tag >>> 3) {
				case 1:
					message.title = reader.string();
					break;
				case 2:
					message.description = reader.string();
					break;
				case 3:
					message.subjectClientId = reader.string();
					break;
				case 4:
					message.substituteClientId = reader.string();
					break;
				default:
					reader.skipType(tag & 7);
					break;
			}
		}
		return message;
	},

	fromJSON(object: any): ClientUpdateProposal {
		return {
			$type: ClientUpdateProposal.$type,
			title: isSet(object.title) ? String(object.title) : '',
			description: isSet(object.description) ? String(object.description) : '',
			subjectClientId: isSet(object.subjectClientId) ? String(object.subjectClientId) : '',
			substituteClientId: isSet(object.substituteClientId) ? String(object.substituteClientId) : ''
		};
	},

	toJSON(message: ClientUpdateProposal): unknown {
		const obj: any = {};
		message.title !== undefined && (obj.title = message.title);
		message.description !== undefined && (obj.description = message.description);
		message.subjectClientId !== undefined && (obj.subjectClientId = message.subjectClientId);
		message.substituteClientId !== undefined &&
			(obj.substituteClientId = message.substituteClientId);
		return obj;
	},

	fromPartial<I extends Exact<DeepPartial<ClientUpdateProposal>, I>>(
		object: I
	): ClientUpdateProposal {
		const message = createBaseClientUpdateProposal();
		message.title = object.title ?? '';
		message.description = object.description ?? '';
		message.subjectClientId = object.subjectClientId ?? '';
		message.substituteClientId = object.substituteClientId ?? '';
		return message;
	}
};

messageTypeRegistry.set(ClientUpdateProposal.$type, ClientUpdateProposal);

function createBaseUpgradeProposal(): UpgradeProposal {
	return {
		$type: 'ibc.core.client.v1.UpgradeProposal',
		title: '',
		description: '',
		plan: undefined,
		upgradedClientState: undefined
	};
}

export const UpgradeProposal = {
	$type: 'ibc.core.client.v1.UpgradeProposal' as const,

	encode(message: UpgradeProposal, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
		if (message.title !== '') {
			writer.uint32(10).string(message.title);
		}
		if (message.description !== '') {
			writer.uint32(18).string(message.description);
		}
		if (message.plan !== undefined) {
			Plan.encode(message.plan, writer.uint32(26).fork()).ldelim();
		}
		if (message.upgradedClientState !== undefined) {
			Any.encode(message.upgradedClientState, writer.uint32(34).fork()).ldelim();
		}
		return writer;
	},

	decode(input: _m0.Reader | Uint8Array, length?: number): UpgradeProposal {
		const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
		let end = length === undefined ? reader.len : reader.pos + length;
		const message = createBaseUpgradeProposal();
		while (reader.pos < end) {
			const tag = reader.uint32();
			switch (tag >>> 3) {
				case 1:
					message.title = reader.string();
					break;
				case 2:
					message.description = reader.string();
					break;
				case 3:
					message.plan = Plan.decode(reader, reader.uint32());
					break;
				case 4:
					message.upgradedClientState = Any.decode(reader, reader.uint32());
					break;
				default:
					reader.skipType(tag & 7);
					break;
			}
		}
		return message;
	},

	fromJSON(object: any): UpgradeProposal {
		return {
			$type: UpgradeProposal.$type,
			title: isSet(object.title) ? String(object.title) : '',
			description: isSet(object.description) ? String(object.description) : '',
			plan: isSet(object.plan) ? Plan.fromJSON(object.plan) : undefined,
			upgradedClientState: isSet(object.upgradedClientState)
				? Any.fromJSON(object.upgradedClientState)
				: undefined
		};
	},

	toJSON(message: UpgradeProposal): unknown {
		const obj: any = {};
		message.title !== undefined && (obj.title = message.title);
		message.description !== undefined && (obj.description = message.description);
		message.plan !== undefined && (obj.plan = message.plan ? Plan.toJSON(message.plan) : undefined);
		message.upgradedClientState !== undefined &&
			(obj.upgradedClientState = message.upgradedClientState
				? Any.toJSON(message.upgradedClientState)
				: undefined);
		return obj;
	},

	fromPartial<I extends Exact<DeepPartial<UpgradeProposal>, I>>(object: I): UpgradeProposal {
		const message = createBaseUpgradeProposal();
		message.title = object.title ?? '';
		message.description = object.description ?? '';
		message.plan =
			object.plan !== undefined && object.plan !== null ? Plan.fromPartial(object.plan) : undefined;
		message.upgradedClientState =
			object.upgradedClientState !== undefined && object.upgradedClientState !== null
				? Any.fromPartial(object.upgradedClientState)
				: undefined;
		return message;
	}
};

messageTypeRegistry.set(UpgradeProposal.$type, UpgradeProposal);

function createBaseHeight(): Height {
	return {
		$type: 'ibc.core.client.v1.Height',
		revisionNumber: Long.UZERO,
		revisionHeight: Long.UZERO
	};
}

export const Height = {
	$type: 'ibc.core.client.v1.Height' as const,

	encode(message: Height, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
		if (!message.revisionNumber.isZero()) {
			writer.uint32(8).uint64(message.revisionNumber);
		}
		if (!message.revisionHeight.isZero()) {
			writer.uint32(16).uint64(message.revisionHeight);
		}
		return writer;
	},

	decode(input: _m0.Reader | Uint8Array, length?: number): Height {
		const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
		let end = length === undefined ? reader.len : reader.pos + length;
		const message = createBaseHeight();
		while (reader.pos < end) {
			const tag = reader.uint32();
			switch (tag >>> 3) {
				case 1:
					message.revisionNumber = reader.uint64() as Long;
					break;
				case 2:
					message.revisionHeight = reader.uint64() as Long;
					break;
				default:
					reader.skipType(tag & 7);
					break;
			}
		}
		return message;
	},

	fromJSON(object: any): Height {
		return {
			$type: Height.$type,
			revisionNumber: isSet(object.revisionNumber)
				? Long.fromValue(object.revisionNumber)
				: Long.UZERO,
			revisionHeight: isSet(object.revisionHeight)
				? Long.fromValue(object.revisionHeight)
				: Long.UZERO
		};
	},

	toJSON(message: Height): unknown {
		const obj: any = {};
		message.revisionNumber !== undefined &&
			(obj.revisionNumber = (message.revisionNumber || Long.UZERO).toString());
		message.revisionHeight !== undefined &&
			(obj.revisionHeight = (message.revisionHeight || Long.UZERO).toString());
		return obj;
	},

	fromPartial<I extends Exact<DeepPartial<Height>, I>>(object: I): Height {
		const message = createBaseHeight();
		message.revisionNumber =
			object.revisionNumber !== undefined && object.revisionNumber !== null
				? Long.fromValue(object.revisionNumber)
				: Long.UZERO;
		message.revisionHeight =
			object.revisionHeight !== undefined && object.revisionHeight !== null
				? Long.fromValue(object.revisionHeight)
				: Long.UZERO;
		return message;
	}
};

messageTypeRegistry.set(Height.$type, Height);

function createBaseParams(): Params {
	return { $type: 'ibc.core.client.v1.Params', allowedClients: [] };
}

export const Params = {
	$type: 'ibc.core.client.v1.Params' as const,

	encode(message: Params, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
		for (const v of message.allowedClients) {
			writer.uint32(10).string(v!);
		}
		return writer;
	},

	decode(input: _m0.Reader | Uint8Array, length?: number): Params {
		const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
		let end = length === undefined ? reader.len : reader.pos + length;
		const message = createBaseParams();
		while (reader.pos < end) {
			const tag = reader.uint32();
			switch (tag >>> 3) {
				case 1:
					message.allowedClients.push(reader.string());
					break;
				default:
					reader.skipType(tag & 7);
					break;
			}
		}
		return message;
	},

	fromJSON(object: any): Params {
		return {
			$type: Params.$type,
			allowedClients: Array.isArray(object?.allowedClients)
				? object.allowedClients.map((e: any) => String(e))
				: []
		};
	},

	toJSON(message: Params): unknown {
		const obj: any = {};
		if (message.allowedClients) {
			obj.allowedClients = message.allowedClients.map((e) => e);
		} else {
			obj.allowedClients = [];
		}
		return obj;
	},

	fromPartial<I extends Exact<DeepPartial<Params>, I>>(object: I): Params {
		const message = createBaseParams();
		message.allowedClients = object.allowedClients?.map((e) => e) || [];
		return message;
	}
};

messageTypeRegistry.set(Params.$type, Params);

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

export type DeepPartial<T> = T extends Builtin
	? T
	: T extends Long
	? string | number | Long
	: T extends Array<infer U>
	? Array<DeepPartial<U>>
	: T extends ReadonlyArray<infer U>
	? ReadonlyArray<DeepPartial<U>>
	: T extends {}
	? { [K in Exclude<keyof T, '$type'>]?: DeepPartial<T[K]> }
	: Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin
	? P
	: P & { [K in keyof P]: Exact<P[K], I[K]> } & Record<
				Exclude<keyof I, KeysOfUnion<P> | '$type'>,
				never
			>;

if (_m0.util.Long !== Long) {
	_m0.util.Long = Long as any;
	_m0.configure();
}

function isSet(value: any): boolean {
	return value !== null && value !== undefined;
}
