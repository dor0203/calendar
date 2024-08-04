import {DayMenu, MonthMenu, YearMenu, TaskMenu} from './menu.js';

function animate(element, className, duration, callback) {
    element.classList.add(className);
    setTimeout(() => {
        element.classList.remove(className);
        if (callback) {
            callback();
        }
    }, duration);
}

function fixCalendar(
    calendar, titleContainer, menuContainer, animation = null, duration = 125
) {
    const [title, menu] = calendar.format();
    const attachCalendar = () => {
        menuContainer.innerHTML = '';
        titleContainer.innerHTML = '';
        menuContainer.appendChild(menu);
        titleContainer.appendChild(title);
    }
    if(animation) {
        const [animationOut, animationIn] = animation;
        animate(menuContainer, animationOut, duration, () => {
            attachCalendar();
            animate(menuContainer, animationIn, duration);
        })
    } else {
        attachCalendar();
    }
}

class Calendar {
    constructor(select) {
        this.calendarState = [
            new TaskMenu(),
            new DayMenu(), 
            new MonthMenu(), 
            new YearMenu()
        ]
        this.currentState = 1;  
        this.selectedDate = new Date();
        this.select = select;
    }

    format() {
        const title = this
            .calendarState[this.currentState]
            .generateTitle(this.selectedDate);
        const menu = this
            .calendarState[this.currentState]
            .generateMenu(this.selectedDate);

        const selectButtons = menu.querySelectorAll(
            '.date-button, .month-button, .year-button'
        );
        selectButtons.forEach(button => {
            button.addEventListener('click', () => {
                this.select(
                    this, new Date(button.getAttribute('date-data'))
                );
            });
        });
        return [title, menu];
    }

    jump(amount){
        switch(this.currentState){
            case 0:
                this.selectedDate.setDate(
                    this.selectedDate.getDate() + amount
                );
                break;
            case 1:
                this.selectedDate.setDate(1);
                this.selectedDate.setMonth(
                    this.selectedDate.getMonth() + amount
                );
                break;
            case 2:
                this.selectedDate.setDate(1);
                this.selectedDate.setFullYear(
                    this.selectedDate.getFullYear() + amount
                );
                break;
            case 3:
                this.selectedDate.setDate(1);
                this.selectedDate.setFullYear(
                    this.selectedDate.getFullYear() + 16*amount
                );
                break;
            default:
                break;
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const titleContainer = document.getElementById('swap-button');
    const menuContainer = document.getElementById('menu');

    const select = (calendar, date) => {
        const animation = ['fadeOutZoomIn', 'fadeInZoomIn'];
        calendar.selectedDate = date;
        calendar.currentState -= 1;
        fixCalendar(calendar, titleContainer, menuContainer, animation);
    }

    const calendar = new Calendar(select);
    fixCalendar(calendar, titleContainer, menuContainer);

    titleContainer.addEventListener('click', () => {
        const animation = ['fadeOutZoomOut', 'fadeInZoomOut'];
        if (calendar.currentState !== 3) {
            calendar.currentState += 1;
        } else { 
            calendar.currentState = 0;
            calendar.selectedDate = new Date();  
        }
        fixCalendar(calendar, titleContainer, menuContainer, animation);
    });

    const nextButton = document.getElementById('next-button');
    nextButton.addEventListener('click', () => {
        const animation = ['slideOutLeftFadeOut', 'slideInRightFadeIn'];
        calendar.jump(1);
        fixCalendar(calendar, titleContainer, menuContainer, animation);
    });

    const prevButton = document.getElementById('prev-button');
    prevButton.addEventListener('click', () => {
        const animation = ['slideOutRightFadeOut', 'slideInLeftFadeIn'];
        calendar.jump(-1);
        fixCalendar(calendar, titleContainer, menuContainer, animation);
    });
})
