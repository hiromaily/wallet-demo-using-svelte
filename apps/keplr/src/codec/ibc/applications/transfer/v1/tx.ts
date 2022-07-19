/* eslint-disable */
import { messageTypeRegistry } from '../../../../typeRegistry';
import { Coin } from '../../../../cosmos/base/v1beta1/coin';
import { Height } from '../../../core/client/v1/client';
import Long from 'long';
import * as _m0 from 'protobufjs/minimal';

export const protobufPackage = 'ibc.applications.transfer.v1';

/**
 * MsgTransfer defines a msg to transfer fungible tokens (i.e Coins) between
 * ICS20 enabled chains. See ICS Spec here:
 * https://github.com/cosmos/ics/tree/master/spec/ics-020-fungible-token-transfer#data-structures
 */
export interface MsgTransfer {
	$type: 'ibc.applications.transfer.v1.MsgTransfer';
	/** the port on which the packet will be sent */
	sourcePort?: string;
	/** the channel by which the packet will be sent */
	sourceChannel?: string;
	/** the tokens to be transferred */
	token?: Coin;
	/** the sender address */
	sender?: string;
	/** the recipient address on the destination chain */
	receiver?: string;
	/**
	 * Timeout height relative to the current block height.
	 * The timeout is disabled when set to 0.
	 */
	timeoutHeight?: Height;
	/**
	 * Timeout timestamp (in nanoseconds) relative to the current block timestamp.
	 * The timeout is disabled when set to 0.
	 */
	timeoutTimestamp?: Long;
}

/** MsgTransferResponse defines the Msg/Transfer response type. */
export interface MsgTransferResponse {
	$type: 'ibc.applications.transfer.v1.MsgTransferResponse';
}

function createBaseMsgTransfer(): MsgTransfer {
	return {
		$type: 'ibc.applications.transfer.v1.MsgTransfer',
		sourcePort: '',
		sourceChannel: '',
		token: undefined,
		sender: '',
		receiver: '',
		timeoutHeight: undefined,
		timeoutTimestamp: Long.UZERO
	};
}

export const MsgTransfer = {
	$type: 'ibc.applications.transfer.v1.MsgTransfer' as const,

	encode(message: MsgTransfer, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
		if (message.sourcePort !== undefined && message.sourcePort !== '') {
			writer.uint32(10).string(message.sourcePort);
		}
		if (message.sourceChannel !== undefined && message.sourceChannel !== '') {
			writer.uint32(18).string(message.sourceChannel);
		}
		if (message.token !== undefined) {
			Coin.encode(message.token, writer.uint32(26).fork()).ldelim();
		}
		if (message.sender !== undefined && message.sender !== '') {
			writer.uint32(34).string(message.sender);
		}
		if (message.receiver !== undefined && message.receiver !== '') {
			writer.uint32(42).string(message.receiver);
		}
		if (message.timeoutHeight !== undefined) {
			Height.encode(message.timeoutHeight, writer.uint32(50).fork()).ldelim();
		}
		if (message.timeoutTimestamp !== undefined && !message.timeoutTimestamp.isZero()) {
			writer.uint32(56).uint64(message.timeoutTimestamp);
		}
		return writer;
	},

	decode(input: _m0.Reader | Uint8Array, length?: number): MsgTransfer {
		const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
		let end = length === undefined ? reader.len : reader.pos + length;
		const message = createBaseMsgTransfer();
		while (reader.pos < end) {
			const tag = reader.uint32();
			switch (tag >>> 3) {
				case 1:
					message.sourcePort = reader.string();
					break;
				case 2:
					message.sourceChannel = reader.string();
					break;
				case 3:
					message.token = Coin.decode(reader, reader.uint32());
					break;
				case 4:
					message.sender = reader.string();
					break;
				case 5:
					message.receiver = reader.string();
					break;
				case 6:
					message.timeoutHeight = Height.decode(reader, reader.uint32());
					break;
				case 7:
					message.timeoutTimestamp = reader.uint64() as Long;
					break;
				default:
					reader.skipType(tag & 7);
					break;
			}
		}
		return message;
	},

	fromJSON(object: any): MsgTransfer {
		return {
			$type: MsgTransfer.$type,
			sourcePort: isSet(object.sourcePort) ? String(object.sourcePort) : '',
			sourceChannel: isSet(object.sourceChannel) ? String(object.sourceChannel) : '',
			token: isSet(object.token) ? Coin.fromJSON(object.token) : undefined,
			sender: isSet(object.sender) ? String(object.sender) : '',
			receiver: isSet(object.receiver) ? String(object.receiver) : '',
			timeoutHeight: isSet(object.timeoutHeight)
				? Height.fromJSON(object.timeoutHeight)
				: undefined,
			timeoutTimestamp: isSet(object.timeoutTimestamp)
				? Long.fromValue(object.timeoutTimestamp)
				: Long.UZERO
		};
	},

	toJSON(message: MsgTransfer): unknown {
		const obj: any = {};
		message.sourcePort !== undefined && (obj.sourcePort = message.sourcePort);
		message.sourceChannel !== undefined && (obj.sourceChannel = message.sourceChannel);
		message.token !== undefined &&
			(obj.token = message.token ? Coin.toJSON(message.token) : undefined);
		message.sender !== undefined && (obj.sender = message.sender);
		message.receiver !== undefined && (obj.receiver = message.receiver);
		message.timeoutHeight !== undefined &&
			(obj.timeoutHeight = message.timeoutHeight
				? Height.toJSON(message.timeoutHeight)
				: undefined);
		message.timeoutTimestamp !== undefined &&
			(obj.timeoutTimestamp = (message.timeoutTimestamp || Long.UZERO).toString());
		return obj;
	},

	fromPartial<I extends Exact<DeepPartial<MsgTransfer>, I>>(object: I): MsgTransfer {
		const message = createBaseMsgTransfer();
		message.sourcePort = object.sourcePort ?? '';
		message.sourceChannel = object.sourceChannel ?? '';
		message.token =
			object.token !== undefined && object.token !== null
				? Coin.fromPartial(object.token)
				: undefined;
		message.sender = object.sender ?? '';
		message.receiver = object.receiver ?? '';
		message.timeoutHeight =
			object.timeoutHeight !== undefined && object.timeoutHeight !== null
				? Height.fromPartial(object.timeoutHeight)
				: undefined;
		message.timeoutTimestamp =
			object.timeoutTimestamp !== undefined && object.timeoutTimestamp !== null
				? Long.fromValue(object.timeoutTimestamp)
				: Long.UZERO;
		return message;
	}
};

messageTypeRegistry.set(MsgTransfer.$type, MsgTransfer);

function createBaseMsgTransferResponse(): MsgTransferResponse {
	return { $type: 'ibc.applications.transfer.v1.MsgTransferResponse' };
}

export const MsgTransferResponse = {
	$type: 'ibc.applications.transfer.v1.MsgTransferResponse' as const,

	encode(_: MsgTransferResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
		return writer;
	},

	decode(input: _m0.Reader | Uint8Array, length?: number): MsgTransferResponse {
		const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
		let end = length === undefined ? reader.len : reader.pos + length;
		const message = createBaseMsgTransferResponse();
		while (reader.pos < end) {
			const tag = reader.uint32();
			switch (tag >>> 3) {
				default:
					reader.skipType(tag & 7);
					break;
			}
		}
		return message;
	},

	fromJSON(_: any): MsgTransferResponse {
		return {
			$type: MsgTransferResponse.$type
		};
	},

	toJSON(_: MsgTransferResponse): unknown {
		const obj: any = {};
		return obj;
	},

	fromPartial<I extends Exact<DeepPartial<MsgTransferResponse>, I>>(_: I): MsgTransferResponse {
		const message = createBaseMsgTransferResponse();
		return message;
	}
};

messageTypeRegistry.set(MsgTransferResponse.$type, MsgTransferResponse);

/** Msg defines the ibc/transfer Msg service. */
export interface Msg {
	/** Transfer defines a rpc handler method for MsgTransfer. */
	Transfer(request: MsgTransfer): Promise<MsgTransferResponse>;
}

export class MsgClientImpl implements Msg {
	private readonly rpc: Rpc;
	constructor(rpc: Rpc) {
		this.rpc = rpc;
		this.Transfer = this.Transfer.bind(this);
	}
	Transfer(request: MsgTransfer): Promise<MsgTransferResponse> {
		const data = MsgTransfer.encode(request).finish();
		const promise = this.rpc.request('ibc.applications.transfer.v1.Msg', 'Transfer', data);
		return promise.then((data) => MsgTransferResponse.decode(new _m0.Reader(data)));
	}
}

interface Rpc {
	request(service: string, method: string, data: Uint8Array): Promise<Uint8Array>;
}

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
