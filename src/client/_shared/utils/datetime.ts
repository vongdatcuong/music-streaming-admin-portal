import { isNil, values } from 'lodash';
import moment from 'moment';

import {
  msPerDay,
  msPerHour,
  msPerMinute,
  msPerMonth,
  msPerSecond,
  msPerYear,
} from '../constants/datetime';
import { FormatTimeFullTzSettings, Nullable } from '../types/common/ViewModel';
import { formatMinDigits } from './number';

export const dateRangeToMs = (
  dateRange: Nullable<[Nullable<moment.Moment>, Nullable<moment.Moment>]>
) => {
  return [
    dateRange?.[0]?.startOf('day')?.valueOf() || undefined,
    dateRange?.[1]?.endOf('day')?.valueOf() || undefined,
  ] as const;
};

export const formatTimeFullTz = (
  time: number | string | undefined,
  settings?: FormatTimeFullTzSettings
) => {
  settings = {
    unix: 'auto-detect',
    format: 'YYYY-MM-DD HH:mm Z',
    ...settings,
  };

  if (!time) return '-';
  if (typeof time === 'string') time = parseInt(time);
  if (settings.unix === 'auto-detect') {
    // actually, we can tell whether a number is unix or not by how big it is, why bother letting the user specify specifically?
    // it helps when some BEs are using the wrong format, and we don't need to wait for them to fix it in order for the users to see the beautifully formatted time
    // if there's a specical case you need to specify "unix" specifically? go ahead, go make your life harder
    settings.unix = String(time).length <= 12;
  }
  const formatter = settings.unix ? moment.unix : moment;
  return formatter(time).format(settings.format);
};

/** Format song duration (ms) */
export const formatSongDuration = (
  duration?: number,
  options?: { emptyDisplay: string }
) => {
  const { emptyDisplay = '' } = options ?? {};
  if (isNil(duration)) return emptyDisplay;

  let positiveDuration = Math.abs(duration || 0);

  return (
    [
      positiveDuration >= msPerDay
        ? {
            ms: msPerDay,
            unit: 'd',
          }
        : undefined,
      positiveDuration >= msPerHour
        ? {
            ms: msPerHour,
            unit: 'h',
          }
        : undefined,
      {
        ms: msPerMinute,
        unit: 'm',
      },
      {
        ms: msPerSecond,
        unit: 's',
      },
    ]
      .filter(Boolean)
      .reduce((formattedString, curUnit) => {
        // Satisfy Typescript
        if (!curUnit?.ms) return '';

        const value = Math.floor(positiveDuration / curUnit?.ms);
        const valueStr =
          curUnit.unit === 's' ? formatMinDigits(value) : value.toString();
        positiveDuration = positiveDuration % curUnit.ms;

        if (formattedString) {
          return formattedString + ':' + valueStr;
        }

        return valueStr;
      }, '') || '0:00'
  );
};
