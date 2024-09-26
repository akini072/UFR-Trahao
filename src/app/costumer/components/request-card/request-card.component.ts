import { Component, Input } from '@angular/core';
import { RequestCategory } from '../../../core/types/request-category';
import { CommonModule } from '@angular/common';
import {
  ButtonComponent,
  ButtonProps,
} from '../../../core/components/button/button.component';
import { ButtonStatusComponent } from '../../../core/components/button-status/button-status.component';
import { LimitedDescriptionPipe } from '../../../core/utils/limited-description.pipe';
import { RequestItem } from '../../pages/costumer-homepage/costumer-homepage.component';
import { StatusTextPipe } from '../../../core/utils/pipes/statusText/status-text.pipe';
import { StatusColorPipe } from '../../../core/utils/pipes/statusColor/status-color.pipe';
@Component({
  selector: 'app-request-card',
  standalone: true,
  imports: [
    CommonModule,
    ButtonComponent,
    ButtonStatusComponent,
    LimitedDescriptionPipe,
    StatusTextPipe,
    StatusColorPipe,
  ],
  templateUrl: './request-card.component.html',
  styleUrl: './request-card.component.css',
  providers: [StatusColorPipe],
})
export class RequestCardComponent {
  @Input() request: RequestItem = {
    id: 0,
    title: 'Default Title',
    description: 'Default Description',
    status: 'open',
    created_at: '2021-01-01',
    image: 'https://via.placeholder.com/150',
  };

  constructor(private statusColorPipe: StatusColorPipe) {}

  style = {
    cardContainer:
      'w-80 h-96 border rounded-lg overflow-hidden shadow-md flex flex-col align-middle justify-center items-center',
    cardHeader: `flex w-full items-center justify-between p-3 w-full`,
    title: 'text-md text-default-black font-bold',
    statusText: 'text-xs text-default-black',
    cardContentContainer: 'flex flex-col w-full justify-between flex-1',
    cardImageContainer: 'flex justify-center h-1/2 overflow-hidden',
    cardImage: 'h-4/6 ',
    cardDataContainer: 'flex flex-col p-4 flex-1 border-t justify-between',
    cardData: 'flex flex-col gap-4',
    cardDescription: 'text-sm text-default-black',
    cardDate: 'text-xs text-default-black font-semibold',
    cardButtonSection:
      'flex justify-between justify-self-end aling-self-end items-center',
    cardButton:
      'text-xs p-2 cursor-pointer text-default-black font-semibold rounded',
  };

  buttonPropColor: string = '';
  ngOnInit(): void {
    this.buttonPropColor = this.statusColorPipe.transform(
      this.request.status,
      'background'
    );
  }
  button: ButtonProps = {
    text: 'Visualizar',
    color: this.buttonPropColor,
    size: 'medium',
    textColor: 'default-black',
    onClick: () => {},
    extraClasses: 'cursor-pointer',
  };
}
