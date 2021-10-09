import { Entity, Column, OneToOne, JoinColumn } from 'typeorm';
import BaseEntity from './BaseEntity';
import Meetings from './Meetings';

@Entity({ name: 'meeting_schedules' })
export default class MeetingSchedules extends BaseEntity {
    @Column({ type: 'timestamp', name: 'start_date' })
    startDate!: Date;

    @Column({ type: 'timestamp', name: 'end_date' })
    endDate!: Date;

    @OneToOne(() => Meetings, (meeting) => meeting.meetingSchedule)
    @JoinColumn({ name: 'meeting_id' })
    meeting!: Meetings;
}
