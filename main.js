import {DayMenu, MonthMenu, YearMenu} from './menu.js';

export function animate(element, className, duration, callback) {
    element.classList.add(className);
    setTimeout(() => {
        element.classList.remove(className);
        if (callback) {
            callback();
        }
    }, duration);
}

class Calendar {
    constructor(titleElement, menuElement) {
        this.titleElement = titleElement;
        this.menuElement = menuElement;

        this.dayMenu = new DayMenu(this.select.bind(this));
        this.monthMenu = new MonthMenu(this.select.bind(this));
        this.yearMenu = new YearMenu(this.select.bind(this));

        this.calendarState = [this.dayMenu, this.monthMenu, this.yearMenu];
        this.currentState = 0;     
        this.selectedDate = new Date();
    }

    updateCalendar() {
        this.titleElement.innerHTML = '';
        this.titleElement.appendChild(
            this.calendarState[this.currentState].generateTitle(this.selectedDate)
        );
        this.menuElement.innerHTML = '';
        this.menuElement.appendChild(
            this.calendarState[this.currentState].generateMenu(this.selectedDate)
        );
    }

    select(date) {
        this.selectedDate = date;
        if (this.currentState !== 0) {
            animate(this.menuElement, 'fadeOutZoomIn', 125, () => {
                this.currentState -= 1;
                this.updateCalendar();
                animate(this.menuElement, 'fadeInZoomIn', 125);
            })
        }
        else {
            this.updateCalendar();
        }
    }

    skip(amount){
        this.selectedDate.setDate(1);
        switch(this.currentState){
            case 0:
                this.selectedDate.setMonth(
                    this.selectedDate.getMonth() + amount
                );
                break;
            case 1:
                this.selectedDate.setFullYear(
                    this.selectedDate.getFullYear() + amount
                );
                break;
            case 2:
                this.selectedDate.setFullYear(
                    this.selectedDate.getFullYear() + 16*amount
                );
                break;
            default:
                break;
        }
        this.updateCalendar();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const swapButton = document.getElementById('swap-button');
    const menuElement = document.getElementById('menu');
    const calendar = new Calendar(swapButton, menuElement);
    calendar.updateCalendar();

    swapButton.addEventListener('click', () => {
        animate(calendar.menuElement, 'fadeOutZoomOut', 125, () => {
            if (calendar.currentState !== 2) {
                calendar.currentState += 1;
            } else { 
                calendar.currentState = 0;
                calendar.selectedDate = new Date();  
            }
            calendar.updateCalendar();
            animate(calendar.menuElement, 'fadeInZoomIn', 125);
        })
    });

    const nextButton = document.getElementById('next-button');
    nextButton.addEventListener('click', () => {
        animate(calendar.menuElement, 'slideOutLeftFadeOut', 125, () => {
            calendar.skip(1);
            calendar.updateCalendar();
            animate(calendar.menuElement, 'slideInRightFadeIn', 125);
        });
    });

    const prevButton = document.getElementById('prev-button');
    prevButton.addEventListener('click', () => {
        animate(calendar.menuElement, 'slideOutRightFadeOut', 125, () => {
            calendar.skip(-1);
            calendar.updateCalendar();
            animate(calendar.menuElement, 'slideInLeftFadeIn', 125);
        });
    });
})

