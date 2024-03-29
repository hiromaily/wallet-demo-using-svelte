#!/bin/bash

# refer to script
# https://github.com/cosmos/cosmjs/blob/v0.25.6/packages/stargate/scripts/define-proto.sh
# better to use cosmjs-types
# https://www.npmjs.com/package/cosmjs-types

#PROTOC=protoc
PROTOC="`yarn bin`"/grpc_tools_node_protoc

ROOT_PROTO_DIR="./proto/cosmos/cosmos-sdk"
COSMOS_PROTO_DIR="$ROOT_PROTO_DIR/proto"
THIRD_PARTY_PROTO_DIR="$ROOT_PROTO_DIR/third_party/proto"
OUT_DIR="./tmp/"

mkdir -p ${OUT_DIR}

# for cosmos files
 proto_dirs=$(find $COSMOS_PROTO_DIR -path -prune -o -name '*.proto' -print0 | xargs -0 -n1 dirname | sort | uniq)
 for dir in $proto_dirs; do
   $PROTOC \
   --plugin="$(yarn bin protoc-gen-ts_proto)" \
   --ts_proto_out="$OUT_DIR" \
   --proto_path="$COSMOS_PROTO_DIR" \
   --proto_path="$THIRD_PARTY_PROTO_DIR" \
   --ts_proto_opt="esModuleInterop=true,forceLong=long,useOptionals=all,outputTypeRegistry=true" \
   $(find "${dir}" -maxdepth 1 -name '*.proto')
 done
# ,importSuffix=.js

# for related third party
 protoc \
   --plugin="$(yarn bin protoc-gen-ts_proto)" \
   --ts_proto_out="$OUT_DIR" \
   --proto_path="$COSMOS_PROTO_DIR" \
   --proto_path="$THIRD_PARTY_PROTO_DIR" \
   --ts_proto_opt="esModuleInterop=true,forceLong=long,useOptionals=all,outputTypeRegistry=true" \
   "$THIRD_PARTY_PROTO_DIR/confio/proofs.proto" \
   "$THIRD_PARTY_PROTO_DIR/tendermint/abci/types.proto" \
   "$THIRD_PARTY_PROTO_DIR/tendermint/crypto/keys.proto" \
   "$THIRD_PARTY_PROTO_DIR/tendermint/crypto/proof.proto" \
   "$THIRD_PARTY_PROTO_DIR/tendermint/libs/bits/types.proto" \
   "$THIRD_PARTY_PROTO_DIR/tendermint/types/params.proto" \
   "$THIRD_PARTY_PROTO_DIR/tendermint/types/types.proto" \
   "$THIRD_PARTY_PROTO_DIR/tendermint/types/validator.proto" \
   "$THIRD_PARTY_PROTO_DIR/tendermint/version/types.proto"

rm -rf ./apps/wallet/src/codec/cosmos
mkdir -p ./apps/wallet/src/codec/cosmos/tx \
  ./apps/wallet/src/codec/cosmos/crypto \
  ./apps/wallet/src/codec/cosmos/base \
  ./apps/wallet/src/codec/cosmos/upgrade

rm -rf ./apps/wallet/src/codec/tendermint
mkdir -p ./apps/wallet/src/codec/tendermint

# mv ${OUT_DIR}cosmos/tx ./apps/wallet/src/codec/cosmos/
# mv ${OUT_DIR}cosmos/crypto ./apps/wallet/src/codec/cosmos/
# mv ${OUT_DIR}cosmos/base ./apps/wallet/src/codec/cosmos/
# mv ${OUT_DIR}cosmos/upgrade ./apps/wallet/src/codec/cosmos/

mkdir -p ./apps/wallet/src/codec/cosmos/base/v1beta1/; mv ${OUT_DIR}cosmos/base/v1beta1/coin.ts $_
mkdir -p ./apps/wallet/src/codec/cosmos/upgrade/v1beta1/; mv ${OUT_DIR}cosmos/upgrade/v1beta1/upgrade.ts $_
mkdir -p ./apps/wallet/src/codec/cosmos/tx/v1beta1/; mv ${OUT_DIR}cosmos/tx/v1beta1/tx.ts $_
mkdir -p ./apps/wallet/src/codec/cosmos/tx/signing/v1beta1/; mv ${OUT_DIR}cosmos/tx/signing/v1beta1/signing.ts $_
mkdir -p ./apps/wallet/src/codec/cosmos/crypto/multisig/v1beta1/; mv ${OUT_DIR}cosmos/crypto/multisig/v1beta1/multisig.ts $_
mkdir -p ./apps/wallet/src/codec/cosmos/crypto/secp256k1/; mv ${OUT_DIR}cosmos/crypto/secp256k1/keys.ts $_

mv ${OUT_DIR}tendermint ./apps/wallet/src/codec/

# Remove unnecessary codec files
#rm -rf ./tmp
