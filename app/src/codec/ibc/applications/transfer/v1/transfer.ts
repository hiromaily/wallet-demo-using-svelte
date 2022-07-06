/* eslint-disable */
import { messageTypeRegistry } from '../../../../typeRegistry';
import Long from 'long';
import * as _m0 from 'protobufjs/minimal';

export const protobufPackage = 'ibc.applications.transfer.v1';

/**
 * FungibleTokenPacketData defines a struct for the packet payload
 * See FungibleTokenPacketData spec:
 * https://github.com/cosmos/ics/tree/master/spec/ics-020-fungible-token-transfer#data-structures
 */
export interface FungibleTokenPacketData {
	$type: 'ibc.applications.transfer.v1.FungibleTokenPacketData';
	/** the token denomination to be transferred */
	denom: string;
	/** the token amount to be transferred */
	amount: Long;
	/** the sender address */
	sender: string;
	/** the recipient address on the destination chain */
	receiver: string;
}

/**
 * DenomTrace contains the base denomination for ICS20 fungible tokens and the
 * source tracing information path.
 */
export interface DenomTrace {
	$type: 'ibc.applications.transfer.v1.DenomTrace';
	/**
	 * path defines the chain of port/channel identifiers used for tracing the
	 * source of the fungible token.
	 */
	path: string;
	/** base denomination of the relayed fungible token. */
	baseDenom: string;
}

/**
 * Params defines the set of IBC transfer parameters.
 * NOTE: To prevent a single token from being transferred, set the
 * TransfersEnabled parameter to true and then set the bank module's SendEnabled
 * parameter for the denomination to false.
 */
export interface Params {
	$type: 'ibc.applications.transfer.v1.Params';
	/**
	 * send_enabled enables or disables all cross-chain token transfers from this
	 * chain.
	 */
	sendEnabled: boolean;
	/**
	 * receive_enabled enables or disables all cross-chain token transfers to this
	 * chain.
	 */
	receiveEnabled: boolean;
}

function createBaseFungibleTokenPacketData(): FungibleTokenPacketData {
	return {
		$type: 'ibc.applications.transfer.v1.FungibleTokenPacketData',
		denom: '',
		amount: Long.UZERO,
		sender: '',
		receiver: ''
	};
}

export const FungibleTokenPacketData = {
	$type: 'ibc.applications.transfer.v1.FungibleTokenPacketData' as const,

	encode(message: FungibleTokenPacketData, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
		if (message.denom !== '') {
			writer.uint32(10).string(message.denom);
		}
		if (!message.amount.isZero()) {
			writer.uint32(16).uint64(message.amount);
		}
		if (message.sender !== '') {
			writer.uint32(26).string(message.sender);
		}
		if (message.receiver !== '') {
			writer.uint32(34).string(message.receiver);
		}
		return writer;
	},

	decode(input: _m0.Reader | Uint8Array, length?: number): FungibleTokenPacketData {
		const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
		let end = length === undefined ? reader.len : reader.pos + length;
		const message = createBaseFungibleTokenPacketData();
		while (reader.pos < end) {
			const tag = reader.uint32();
			switch (tag >>> 3) {
				case 1:
					message.denom = reader.string();
					break;
				case 2:
					message.amount = reader.uint64() as Long;
					break;
				case 3:
					message.sender = reader.string();
					break;
				case 4:
					message.receiver = reader.string();
					break;
				default:
					reader.skipType(tag & 7);
					break;
			}
		}
		return message;
	},

	fromJSON(object: any): FungibleTokenPacketData {
		return {
			$type: FungibleTokenPacketData.$type,
			denom: isSet(object.denom) ? String(object.denom) : '',
			amount: isSet(object.amount) ? Long.fromValue(object.amount) : Long.UZERO,
			sender: isSet(object.sender) ? String(object.sender) : '',
			receiver: isSet(object.receiver) ? String(object.receiver) : ''
		};
	},

	toJSON(message: FungibleTokenPacketData): unknown {
		const obj: any = {};
		message.denom !== undefined && (obj.denom = message.denom);
		message.amount !== undefined && (obj.amount = (message.amount || Long.UZERO).toString());
		message.sender !== undefined && (obj.sender = message.sender);
		message.receiver !== undefined && (obj.receiver = message.receiver);
		return obj;
	},

	fromPartial<I extends Exact<DeepPartial<FungibleTokenPacketData>, I>>(
		object: I
	): FungibleTokenPacketData {
		const message = createBaseFungibleTokenPacketData();
		message.denom = object.denom ?? '';
		message.amount =
			object.amount !== undefined && object.amount !== null
				? Long.fromValue(object.amount)
				: Long.UZERO;
		message.sender = object.sender ?? '';
		message.receiver = object.receiver ?? '';
		return message;
	}
};

messageTypeRegistry.set(FungibleTokenPacketData.$type, FungibleTokenPacketData);

function createBaseDenomTrace(): DenomTrace {
	return {
		$type: 'ibc.applications.transfer.v1.DenomTrace',
		path: '',
		baseDenom: ''
	};
}

export const DenomTrace = {
	$type: 'ibc.applications.transfer.v1.DenomTrace' as const,

	encode(message: DenomTrace, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
		if (message.path !== '') {
			writer.uint32(10).string(message.path);
		}
		if (message.baseDenom !== '') {
			writer.uint32(18).string(message.baseDenom);
		}
		return writer;
	},

	decode(input: _m0.Reader | Uint8Array, length?: number): DenomTrace {
		const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
		let end = length === undefined ? reader.len : reader.pos + length;
		const message = createBaseDenomTrace();
		while (reader.pos < end) {
			const tag = reader.uint32();
			switch (tag >>> 3) {
				case 1:
					message.path = reader.string();
					break;
				case 2:
					message.baseDenom = reader.string();
					break;
				default:
					reader.skipType(tag & 7);
					break;
			}
		}
		return message;
	},

	fromJSON(object: any): DenomTrace {
		return {
			$type: DenomTrace.$type,
			path: isSet(object.path) ? String(object.path) : '',
			baseDenom: isSet(object.baseDenom) ? String(object.baseDenom) : ''
		};
	},

	toJSON(message: DenomTrace): unknown {
		const obj: any = {};
		message.path !== undefined && (obj.path = message.path);
		message.baseDenom !== undefined && (obj.baseDenom = message.baseDenom);
		return obj;
	},

	fromPartial<I extends Exact<DeepPartial<DenomTrace>, I>>(object: I): DenomTrace {
		const message = createBaseDenomTrace();
		message.path = object.path ?? '';
		message.baseDenom = object.baseDenom ?? '';
		return message;
	}
};

messageTypeRegistry.set(DenomTrace.$type, DenomTrace);

function createBaseParams(): Params {
	return {
		$type: 'ibc.applications.transfer.v1.Params',
		sendEnabled: false,
		receiveEnabled: false
	};
}

export const Params = {
	$type: 'ibc.applications.transfer.v1.Params' as const,

	encode(message: Params, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
		if (message.sendEnabled === true) {
			writer.uint32(8).bool(message.sendEnabled);
		}
		if (message.receiveEnabled === true) {
			writer.uint32(16).bool(message.receiveEnabled);
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
					message.sendEnabled = reader.bool();
					break;
				case 2:
					message.receiveEnabled = reader.bool();
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
			sendEnabled: isSet(object.sendEnabled) ? Boolean(object.sendEnabled) : false,
			receiveEnabled: isSet(object.receiveEnabled) ? Boolean(object.receiveEnabled) : false
		};
	},

	toJSON(message: Params): unknown {
		const obj: any = {};
		message.sendEnabled !== undefined && (obj.sendEnabled = message.sendEnabled);
		message.receiveEnabled !== undefined && (obj.receiveEnabled = message.receiveEnabled);
		return obj;
	},

	fromPartial<I extends Exact<DeepPartial<Params>, I>>(object: I): Params {
		const message = createBaseParams();
		message.sendEnabled = object.sendEnabled ?? false;
		message.receiveEnabled = object.receiveEnabled ?? false;
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
