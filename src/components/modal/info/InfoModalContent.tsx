import dayjs from 'dayjs';

interface Props {
  schedule: Schedule;
}

export function InfoModalContent({ schedule }: Props) {
  const formattedStartDate = dayjs(schedule.startDate).format(
    'MM월 DD일 (dddd)',
  );
  const formattedEndDate = dayjs(schedule.endDate).format('MM월 DD일 (dddd)');

  const colorClass = `bg-${schedule.color}-400`;

  return (
    <div className="mb-9">
      <div className="ml-4 flex">
        <div className={`mr-4 mt-2.5 size-4 rounded-sm ${colorClass}`} />

        <div>
          <h2 className="text-[22px] text-google_gray">{schedule.title}</h2>
          <div className="mt-1 text-sm text-google_gray">
            {schedule.startDate === schedule.endDate ? (
              <>
                <span>{formattedStartDate}</span>
                <span className="mx-2">⋅</span>
                <span>{schedule.startTime} ~ </span>
                <span>{schedule.endTime}</span>
              </>
            ) : (
              <>
                <span>{formattedStartDate},</span>
                <span> {schedule.startTime} ~ </span>
                <span>{formattedEndDate},</span>
                <span> 오후 10:15</span>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
