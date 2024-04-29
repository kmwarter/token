/**
 * This code was AUTOGENERATED using the kinobi library.
 * Please DO NOT EDIT THIS FILE, instead use visitors
 * to add features, then rerun kinobi to update it.
 *
 * @see https://github.com/metaplex-foundation/kinobi
 */

import {
  Address,
  Codec,
  Decoder,
  Encoder,
  IAccountMeta,
  IInstruction,
  IInstructionWithAccounts,
  IInstructionWithData,
  Option,
  OptionOrNullable,
  WritableAccount,
  combineCodec,
  getAddressDecoder,
  getAddressEncoder,
  getOptionDecoder,
  getOptionEncoder,
  getStructDecoder,
  getStructEncoder,
  getU8Decoder,
  getU8Encoder,
  transformEncoder,
} from '@solana/web3.js';
import { TOKEN_PROGRAM_ADDRESS } from '../programs';
import { ResolvedAccount, getAccountMetaFactory } from '../shared';

export type InitializeMint2Instruction<
  TProgram extends string = typeof TOKEN_PROGRAM_ADDRESS,
  TAccountMint extends string | IAccountMeta<string> = string,
  TRemainingAccounts extends readonly IAccountMeta<string>[] = [],
> = IInstruction<TProgram> &
  IInstructionWithData<Uint8Array> &
  IInstructionWithAccounts<
    [
      TAccountMint extends string
        ? WritableAccount<TAccountMint>
        : TAccountMint,
      ...TRemainingAccounts,
    ]
  >;

export type InitializeMint2InstructionData = {
  discriminator: number;
  /** Number of base 10 digits to the right of the decimal place. */
  decimals: number;
  /** The authority/multisignature to mint tokens. */
  mintAuthority: Address;
  /** The optional freeze authority/multisignature of the mint. */
  freezeAuthority: Option<Address>;
};

export type InitializeMint2InstructionDataArgs = {
  /** Number of base 10 digits to the right of the decimal place. */
  decimals: number;
  /** The authority/multisignature to mint tokens. */
  mintAuthority: Address;
  /** The optional freeze authority/multisignature of the mint. */
  freezeAuthority: OptionOrNullable<Address>;
};

export function getInitializeMint2InstructionDataEncoder(): Encoder<InitializeMint2InstructionDataArgs> {
  return transformEncoder(
    getStructEncoder([
      ['discriminator', getU8Encoder()],
      ['decimals', getU8Encoder()],
      ['mintAuthority', getAddressEncoder()],
      ['freezeAuthority', getOptionEncoder(getAddressEncoder())],
    ]),
    (value) => ({ ...value, discriminator: 20 })
  );
}

export function getInitializeMint2InstructionDataDecoder(): Decoder<InitializeMint2InstructionData> {
  return getStructDecoder([
    ['discriminator', getU8Decoder()],
    ['decimals', getU8Decoder()],
    ['mintAuthority', getAddressDecoder()],
    ['freezeAuthority', getOptionDecoder(getAddressDecoder())],
  ]);
}

export function getInitializeMint2InstructionDataCodec(): Codec<
  InitializeMint2InstructionDataArgs,
  InitializeMint2InstructionData
> {
  return combineCodec(
    getInitializeMint2InstructionDataEncoder(),
    getInitializeMint2InstructionDataDecoder()
  );
}

export type InitializeMint2Input<TAccountMint extends string = string> = {
  /** The mint to initialize. */
  mint: Address<TAccountMint>;
  decimals: InitializeMint2InstructionDataArgs['decimals'];
  mintAuthority: InitializeMint2InstructionDataArgs['mintAuthority'];
  freezeAuthority: InitializeMint2InstructionDataArgs['freezeAuthority'];
};

export function getInitializeMint2Instruction<TAccountMint extends string>(
  input: InitializeMint2Input<TAccountMint>
): InitializeMint2Instruction<typeof TOKEN_PROGRAM_ADDRESS, TAccountMint> {
  // Program address.
  const programAddress = TOKEN_PROGRAM_ADDRESS;

  // Original accounts.
  const originalAccounts = {
    mint: { value: input.mint ?? null, isWritable: true },
  };
  const accounts = originalAccounts as Record<
    keyof typeof originalAccounts,
    ResolvedAccount
  >;

  // Original args.
  const args = { ...input };

  const getAccountMeta = getAccountMetaFactory(programAddress, 'programId');
  const instruction = {
    accounts: [getAccountMeta(accounts.mint)],
    programAddress,
    data: getInitializeMint2InstructionDataEncoder().encode(
      args as InitializeMint2InstructionDataArgs
    ),
  } as InitializeMint2Instruction<typeof TOKEN_PROGRAM_ADDRESS, TAccountMint>;

  return instruction;
}

export type ParsedInitializeMint2Instruction<
  TProgram extends string = typeof TOKEN_PROGRAM_ADDRESS,
  TAccountMetas extends readonly IAccountMeta[] = readonly IAccountMeta[],
> = {
  programAddress: Address<TProgram>;
  accounts: {
    /** The mint to initialize. */
    mint: TAccountMetas[0];
  };
  data: InitializeMint2InstructionData;
};

export function parseInitializeMint2Instruction<
  TProgram extends string,
  TAccountMetas extends readonly IAccountMeta[],
>(
  instruction: IInstruction<TProgram> &
    IInstructionWithAccounts<TAccountMetas> &
    IInstructionWithData<Uint8Array>
): ParsedInitializeMint2Instruction<TProgram, TAccountMetas> {
  if (instruction.accounts.length < 1) {
    // TODO: Coded error.
    throw new Error('Not enough accounts');
  }
  let accountIndex = 0;
  const getNextAccount = () => {
    const accountMeta = instruction.accounts![accountIndex]!;
    accountIndex += 1;
    return accountMeta;
  };
  return {
    programAddress: instruction.programAddress,
    accounts: {
      mint: getNextAccount(),
    },
    data: getInitializeMint2InstructionDataDecoder().decode(instruction.data),
  };
}
