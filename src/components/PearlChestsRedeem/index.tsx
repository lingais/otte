import { Divider, Paper, Typography } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { LabelChip } from '../Chip';
import { getTokenImage, formatCurrency } from 'src/helpers';
import formatDate from 'date-fns/format';
import differenceInDays from 'date-fns/differenceInDays';
import receiptImage from './receipt.png';
import './styles.scss';
import CustomButton from '../Button/CustomButton';
import { useSelector } from 'src/store/hook';
import { useCallback, useMemo, useState } from 'react';
import { useDispatch, useSelector as useReduxSelector } from 'react-redux';
import {
  redeem as redeemAction,
  claimReward as claimRewardAction,
  extendLock as extendLockAction,
  ITerm,
  ILock,
  selectTerm as selectTermAction,
} from 'src/store/slices/pearl-vault-slice';
import { useWeb3Context } from 'src/hooks';
import ActionButton from '../Button/ActionButton';
import { IPendingTxn } from 'src/store/slices/pending-txns-slice';
import { IReduxState } from 'src/store/slices/state.interface';
import PearlChestLockupModal from '../PearlChestLockupModal';
import PearlChestLockupSuccessModal from '../PearlChestLockupSuccessModal';
import { addDays } from 'date-fns';
import getNoteImage from 'src/helpers/get-note-image';

const numberFormatter = Intl.NumberFormat('en', { maximumFractionDigits: 0 });

const extraBonus: { [k: number]: number } = {
  28: 5,
  90: 10,
  180: 20,
};

export interface Note {
  id: string;
  amount: string;
  currentReward: string;
  nextReward: number;
  lockedValue: number;
  marketValue: number;
  lockupPeriod: number;
  dueDate: Date;
  apy: number;
  locked: boolean;
}

export default function PearlChestsRedeem() {
  const [relockResult, setRelockResult] = useState<any>();
  const [selectedLock, setSelectedLock] = useState<ILock | undefined>();
  const currentEpoch = useSelector(state => state.app.currentEpoch);
  const selectedTerm = useSelector(state => state.pearlVault.selectedTerm);
  const locks = useSelector(state => state.pearlVault.locks);
  const terms = useSelector(state => state.pearlVault.terms);
  const pearlPrice = useSelector(state => state.app.pearlPrice);
  const termsMap = useMemo(() => {
    return new Map(
      terms
        .flatMap(term => [term, term.fallbackTerm])
        .filter(Boolean)
        .map(term => [term?.noteAddress, term]),
    );
  }, [terms]);

  const dispatch = useDispatch();

  const clearSelectedTerm = useCallback(() => {
    dispatch(selectTermAction(undefined));
  }, []);

  const claimAndRelock = useCallback((term, lock) => {
    dispatch(selectTermAction(term));
    setSelectedLock(lock);
  }, []);

  const handleRelockSuccessEvent = useCallback(
    (result: any) => {
      clearSelectedTerm();
      setRelockResult(result);
    },
    [relockResult],
  );

  return (
    <Paper className="ohm-card">
      {locks.map((lock, i) => {
        const term = termsMap.get(lock.noteAddress)!;
        return (
          <NoteCard
            key={i}
            term={term}
            lock={lock}
            claimAndRelock={claimAndRelock}
            note={{
              id: lock.tokenId,
              amount: lock.amount,
              currentReward: lock.reward,
              nextReward: -1,
              lockedValue: -1,
              marketValue: Number(lock.amount) * pearlPrice,
              lockupPeriod: term.lockPeriod,
              dueDate: addDays(Date.UTC(2021, 10, 3, 0, 0, 0), lock.endEpoch / 3),
              apy: 492391,
              locked: currentEpoch < lock.endEpoch,
            }}
          />
        );
      })}
      <PearlChestLockupModal
        discount={extraBonus[Number(selectedTerm?.lockPeriod) ?? 0] ?? 0}
        open={Boolean(selectedTerm)}
        term={selectedTerm}
        lock={selectedLock}
        onClose={clearSelectedTerm}
        onSuccess={handleRelockSuccessEvent}
      />
      <PearlChestLockupSuccessModal
        open={Boolean(relockResult)}
        actionResult={relockResult}
        onClose={() => setRelockResult(undefined)}
      />
    </Paper>
  );
}

function NoteCard({
  note,
  term,
  lock,
  claimAndRelock,
}: {
  note: Note;
  term: ITerm;
  lock: ILock;
  claimAndRelock: (term: ITerm, lock: ILock) => void;
}) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { provider, address, chainID } = useWeb3Context();
  const pendingTransactions = useReduxSelector<IReduxState, IPendingTxn[]>(state => {
    return state.pendingTransactions;
  });
  const details = [
    {
      label: 'pearlChests.lockupAmount',
      after: <span className="note__peral-icon">{getTokenImage('pearl', 20)}</span>,
      value: note.amount,
    },
    { label: 'pearlChests.currentReward', value: note.currentReward + ' PERAL' },
    {
      label: 'pearlChests.nextReward',
      value: numberFormatter.format(note.nextReward) + ' PERAL',
      params: { boost: 2 },
    },
    { label: 'pearlChests.lockedValue', value: numberFormatter.format(note.lockedValue) + ' PERAL' },
    { label: 'pearlChests.marketValue', value: formatCurrency(note.marketValue) },
    {
      label: 'pearlChests.lockupPeriod',
      value: note.lockupPeriod,
      after: <span className="note__countdown">{differenceInDays(note.dueDate, new Date())} days left</span>,
    },
    {
      label: 'pearlChests.dueDate',
      value: formatDate(note.dueDate, 'MMMM, d, Y, hh:mm a (O)'),
    },
    { label: 'pearlChests.apy', value: numberFormatter.format(note.apy) + '%' },
  ];

  const redeem = useCallback(() => {
    dispatch(
      redeemAction({
        address,
        chainID,
        provider,
        noteAddress: lock.noteAddress,
        tokenId: lock.tokenId,
      }),
    );
  }, [lock, address]);

  const claimReward = useCallback(() => {
    dispatch(
      claimRewardAction({
        chainID,
        provider,
        noteAddress: lock.noteAddress,
        tokenId: lock.tokenId,
        address,
      }),
    );
  }, [lock, address]);

  return (
    <div className="note">
      <Typography className="note__title" variant="h3" component="h3">
        {term.note.name}
        <LockStatus locked={note.locked} />
        <span className="note__id">{note.id}</span>
      </Typography>

      <div className="note__body">
        <div className="note__receipt-image">
          {/* TODO: load image from NFT */}
          <img src={getNoteImage(term.note.name)} />
        </div>
        <Divider className="note__div" flexItem orientation="vertical" />
        <div className="note__details">
          {details.map(row => (
            <div key={row.label} className="note__details-row">
              <span className="note__details-label">{t(row.label, row.params)}</span>
              <span className="note__details-value">
                {row.value}
                {row.after}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="note__actions">
        {note.locked && (
          <>
            <ActionButton
              pendingTransactions={pendingTransactions}
              type={'extend-lock_' + term.noteAddress + '_' + lock.tokenId}
              start={t('pearlChests.claimRewardAndRelock')}
              progress="Processing..."
              processTx={() => claimAndRelock(term, lock)}
              wrapper={({ onClick, text }) => <CustomButton className="note__action" text={text} onClick={onClick} />}
            />
            <ActionButton
              pendingTransactions={pendingTransactions}
              type={'claim-reward_' + term.noteAddress + '_' + lock.tokenId}
              start={t('pearlChests.claimReward')}
              progress="Processing..."
              processTx={claimReward}
              wrapper={({ onClick, text }) => (
                <CustomButton className="note__action" type="outline" text={text} onClick={onClick} />
              )}
            />
          </>
        )}
        {!note.locked && (
          <ActionButton
            pendingTransactions={pendingTransactions}
            type={'redeem_' + term.noteAddress + '_' + lock.tokenId}
            start={t('pearlChests.redeemAll')}
            progress="Processing..."
            processTx={redeem}
            wrapper={({ onClick, text }) => <CustomButton className="note__action" text={text} onClick={onClick} />}
          />
        )}
      </div>
    </div>
  );
}

function LockStatus({ locked }: { locked?: boolean }) {
  const { t } = useTranslation();
  const label = locked ? t('pearlChests.locked') : t('pearlChests.unlocked');
  const className = locked ? 'note__lock-status' : 'note__lock-status note__lock-status--unlocked';
  return <LabelChip className={className} label={label} />;
}
