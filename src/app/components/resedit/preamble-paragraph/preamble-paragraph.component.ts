import { Component, OnInit, Input } from '@angular/core';
import { ResolutionService } from '../../../services/resolution.service';
import { PreambleParagraph } from '../../../models/resolution/preamble-paragraph.model';
import { Notice } from '../../../models/notice.model';
import { NoticeTag } from '../../../models/notice-tag.model';
import { WindowPosition } from '../../../models/window-position.model';
import { UserService } from '../../../services/user.service';
import { Resolution } from 'src/app/models/resolution/resolution.model';

@Component({
  selector: 'app-preamble-paragraph',
  templateUrl: './preamble-paragraph.component.html',
  styleUrls: ['./preamble-paragraph.component.css']
})
export class PreambleParagraphComponent implements OnInit {

  @Input() paragraph: PreambleParagraph;

  @Input() resolution: Resolution;

  @Input() index: number;

  hideNotices = true;

  newComment: Notice = new Notice();

  newTag: NoticeTag = new NoticeTag();

  noticeWindowLeft = 0;
  noticeWindowTop = 0;

  firstShowNotices = true;

  saveState = 'N';

  waitToSave = false;

  saveRequestCount = 0;

  constructor(private service: ResolutionService, private userService: UserService) { }

  onKey(event: any) {
    this.saveState = 'N';
    this.paragraph.text = event.target.value;

    if (!this.waitToSave) {
      this.saveChanges();
    }
  }

  async saveChanges() {
    this.waitToSave = true;
    await this.delay(3000);
    //Wait for a few seconds before trying to save

    this.service.updatePublicResolutionPreambleParagraph(this.resolution, this.paragraph).subscribe(n => {
      this.saveState = 'S';
      this.waitToSave = false;
    },
      err => {
        this.saveState = 'E';
        this.saveRequestCount++;
        // try to save again
        this.saveChanges();
      }
    );
  }

  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  ngOnInit() {
  }

  delete() {
    const index: number = this.resolution.preamble.paragraphs.indexOf(this.paragraph);
    if (index !== -1) {
      this.resolution.preamble.paragraphs.splice(index, 1);
      this.service.savePublicResolution(this.resolution).subscribe();
    }
    //this.service.removePrembleParagraph(this.resolution.resolutionId, this.paragraph.preambleParagraphId);
  }

  moveUp() {
    const index: number = this.resolution.preamble.paragraphs.indexOf(this.paragraph);
    if (index !== -1 && index !== 0) {
      this.resolution.preamble.paragraphs.splice(index - 1, 0, this.resolution.preamble.paragraphs.splice(index, 1)[0]);
      this.service.savePublicResolution(this.resolution).subscribe();
    }
    //this.service.movePrembleParagraphUp(this.resolution.resolutionId, this.paragraph.preambleParagraphId);
  }

  moveDown() {
    const index: number = this.resolution.preamble.paragraphs.indexOf(this.paragraph);
    if (index !== -1 && index <= this.resolution.preamble.paragraphs.length) {
      this.resolution.preamble.paragraphs.splice(index + 1, 0, this.resolution.preamble.paragraphs.splice(index, 1)[0]);
      this.service.savePublicResolution(this.resolution).subscribe();
    }
    //this.service.movePrembleParagraphDown(this.resolution.resolutionId, this.paragraph.preambleParagraphId);
  }

  showNotices(val) {
    if (this.firstShowNotices) {
      this.noticeWindowLeft = val.x;
      this.noticeWindowTop = val.y;
      this.firstShowNotices = false;
    }
    this.hideNotices = false;
  }

  toggleNotices() {
    this.hideNotices = !this.hideNotices;
  }

  addNotice() {
    //this.paragraph.Notices.push(notice);
    this.service.changePreambleParagraphNotice(this.paragraph, this.newComment).subscribe(n => {
      //this.paragraph.Notices.push(n);
      this.newComment.text = '';
      this.newComment.title = '';
      this.newComment.tags = [];

    });
  }

  addTag() {
    const tagClone = new NoticeTag();
    tagClone.text = this.newTag.text;
    tagClone.type = this.newTag.type;
    tagClone.id = Date.now().toString();
    this.newComment.tags.push(tagClone);
    this.newTag.text = '';

  }

  removeTag(tag: NoticeTag) {
    const index = this.newComment.tags.indexOf(tag);
    this.newComment.tags.splice(index, 1);
  }

  deleteNotice(notice: Notice) {
    const index = this.paragraph.notices.indexOf(notice);
    if (index != -1) {
      this.paragraph.notices.splice(index, 1);
    }
    this.service.changePreambleParagraphNotices(this.paragraph).subscribe();
  }

  noticeRead(notice: Notice) {
    //if (this.userService.currentUser != null) {
    //  let name = this.userService.currentUser.Username;

    //  if (this.userService.currentUser.Forename != null && this.userService.currentUser.Lastname != null) {
    //    name = this.userService.currentUser.Forename + ' ' + this.userService.currentUser.Lastname;
    //  }

    //  if (!notice.ReadBy.includes(name)) {
    //    notice.ReadBy.push(name);
    //  }
    //}
    //this.service.changePreambleParagraphNotice(this.paragraph, notice).subscribe();
  }

  noticeUpdated(notice: Notice) {
    this.service.changePreambleParagraphNotice(this.paragraph, notice).subscribe();
  }

  moveStopped(val: WindowPosition) {
    this.noticeWindowLeft = val.Left;
    this.noticeWindowTop = val.Top;
  }

  textAreaBlur() {
    this.service.currentPreambleParagraph = null;
  }

  textAreaFocus() {
    this.service.currentPreambleParagraph = this.paragraph;
  }
}
