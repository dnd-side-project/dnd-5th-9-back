import { CreateMeetingPlaceDto } from './dto/create-meeting-place.dto';
import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
} from '@nestjs/common';
import { MeetingsService } from './meetings.service';
import { CreateMeetingDto } from './dto/create-meeting.dto';
import { UpdateMeetingDto } from './dto/update-meeting.dto';

@Controller('meetings')
export class MeetingsController {
    constructor(private readonly meetingsService: MeetingsService) {}

    @Post()
    create(@Body() createMeetingDto: CreateMeetingDto) {
        return this.meetingsService.create(createMeetingDto);
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
}
