import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ButtonProps } from '../../../core/components/button/button.component';
import { ButtonStatusComponent } from '../../../core/components/button-status/button-status.component';
import { LimitedDescriptionPipe, StatusTextPipe, StatusColorPipe } from '../../../core/utils/pipes';
import { RequestItem } from '../../../core/types';
@Component({
  selector: 'app-request-card',
  standalone: true,
  imports: [
    CommonModule,
    ButtonStatusComponent,
    LimitedDescriptionPipe,
    StatusTextPipe,
    StatusColorPipe,
    RouterModule
  ],
  templateUrl: './request-card.component.html',
  styleUrl: './request-card.component.css',
  providers: [StatusColorPipe],
})
export class RequestCardComponent {
  @Input() request!: RequestItem;

  constructor(private statusColorPipe: StatusColorPipe) {}

  style = {
    cardContainer:
      'w-80 h-96 border rounded-lg overflow-hidden shadow-md bg-white flex flex-col align-middle justify-center items-center',
    cardHeader: `flex w-full items-center justify-between p-3 w-full`,
    title: 'text-md text-white font-bold',
    statusText: 'text-xs text-white',
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
      'text-xs p-2 cursor-pointer text-white font-semibold rounded',
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
    textColor: 'white',
    onClick: () => {},
    extraClasses: 'cursor-pointer',
  };
}
