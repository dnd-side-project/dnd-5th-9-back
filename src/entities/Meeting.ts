import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    OneToMany,
    OneToOne,
    ManyToMany,
} from 'typeorm';
import MeetingMember from './Meeting_member';
import MeetingSchedule from './Meeting_schedule';
import User from './User';

@Entity({ name: 'meeting' })
export default class Meeting {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    title!: string;

    @Column()
    param!: string;

    @Column()
    description!: string;

    @Column({ name: 'place_yn', type: 'boolean', default: true })
    placeYn!: boolean;

    @OneToOne(
        () => MeetingSchedule,
        (meetingSchedule) => meetingSchedule.meeting
    )
    meetingSchedule: MeetingSchedule | undefined;

    @OneToMany(() => MeetingMember, (meetingMember) => meetingMember.meeting)
    meetingMembers: MeetingMember[] | undefined;

    @ManyToMany(() => User, (user) => user.meetings)
    users: User[] | undefined;
}
