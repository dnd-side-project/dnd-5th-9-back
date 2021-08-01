import { CreateMeetingPlaceDto } from './dto/create-meeting-place.dto';
import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    NotFoundException,
    UnauthorizedException,
} from '@nestjs/common';
import { MeetingsService } from './meetings.service';
import { CreateMeetingDto } from './dto/create-meeting.dto';
import { UpdateMeetingDto } from './dto/update-meeting.dto';
import Users from '../entities/Users';

@Controller('meetings')
export class MeetingsController {
    constructor(private readonly meetingsService: MeetingsService) {}

    @Post()
    create(@Body() createMeetingDto: CreateMeetingDto) {
        return this.meetingsService.create(createMeetingDto);
    }

    @Get('member/:meetingId')
    async getMembers(@Param('meetingId') meetingId: number) {
        const result = await this.meetingsService.getMembers(meetingId);
        if (!result) throw new NotFoundException();
        return result;
    }

    @Get('/:meetingId/:nickname')
    checkOverlapNickname(
        @Param('meetingId') meetingId: number,
        @Param('nickname') nickname: string
    ) {
        return this.meetingsService.checkOverlapNickname(meetingId, nickname);
    }

    @Post('place')
    createPlace(@Body() createMeetingPlaceDto: CreateMeetingPlaceDto) {
        return this.meetingsService.createPlace(createMeetingPlaceDto);
    }

    @Get()
    findAll() {
        return this.meetingsService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.meetingsService.findOne(+id);
    }

    @Patch(':id')
    update(
        @Param('id') id: string,
        @Body() updateMeetingDto: UpdateMeetingDto
    ) {
        return this.meetingsService.update(+id, updateMeetingDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.meetingsService.remove(+id);
    }

    @Delete(':meetingId/member/:memberId')
    removeMember(
        @Param('meetingId') meetingId: number,
        @Param('memberId') memberId: number
    ) {
        const isAuth = this.meetingsService.isAuth(new Users(), meetingId); //TODO: 인가 기능 구현되면 실제 user 넣어야 함
        if (!isAuth) throw new UnauthorizedException();
        this.meetingsService.removeMember(memberId);
    }
}
