use solana_program::{
    account_info::AccountInfo,
    entrypoint,
    entrypoint::ProgramResult,
    msg,
    pubkey:: Pubkey
};

use std::convert::TryInto;

entrypoint!(process_instruction);

pub fn process_instruction(
    program_id: &Pubkey,
    accounts:&[AccountInfo],
    instruction_data: &[u8]
) -> ProgramResult {
    let (key, rem): (&u8, &[u8]) = instruction_data.split_first().unwrap();

    match key {
        0 => {
            let value: u64 = rem
                .get(0..8)
                .and_then(|slice| slice.try_into().ok())
                .map(u64::from_le_bytes)
                .unwrap_or(0);

            msg!("zero! {}", value);
        },
        1 => msg!("one"),
        _ => msg!("error: {:?}", instruction_data),
    };

    Ok(())
}