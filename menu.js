export class Menu {
    generateMenu() {}
    generateTitle() {}
}
export class DayMenu extends Menu {
    constructor(select) {
        super();
        this.dayInWeek = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
        this.select = select;
    }

    generateMenu(selectedDate) {
        /// return a 'menu-container' with 'day-container' and 'date-container'
        const dayContainer = this.generateDay();
        const dateContainer = this.generateDate(selectedDate);
        const menuContainer = document.createElement('div');
        menuContainer.className = 'menu-container';
        menuContainer.appendChild(dayContainer);
        menuContainer.appendChild(dateContainer);
        return menuContainer
    }

    generateDay() {
        /// return a 'day-container' with 'day-span' for each day of the week
        const dayContainer = document.createElement('div');
        dayContainer.className = 'day-span-container';
        this.dayInWeek.forEach(day => {
            const daySpan = document.createElement('span');
            daySpan.className = 'day-span';
            daySpan.textContent = day;
            dayContainer.appendChild(daySpan);
        })
        return dayContainer;
    }

    generateDate(selectedDate) {
        /// return a 'date-container' with 'date-button' for 42 days starting 
        /// from the first sunday before the month (or the 1st if sunday) 
        /// some with the 'in-month'/ 'selected'/ 'today' class
        const today = new Date();
        const dateContainer = document.createElement('div');
        dateContainer.className = 'date-button-container';
        const referenceSunday = new Date(selectedDate);
        referenceSunday.setDate(1);
        if(referenceSunday.getDay()){
            referenceSunday.setDate(
                referenceSunday.getDate() - referenceSunday.getDay()
            );
        };
        for (let i = 0; i < 42; i++) {
            const date = new Date(referenceSunday);
            date.setDate(date.getDate() + i);
            const dateButton = document.createElement('button');
            dateButton.className = 'date-button';
            if (date.getMonth() === selectedDate.getMonth()) {
                dateButton.classList.add('date-in-month');
            }
            if (date.toDateString() === selectedDate.toDateString()) {
                dateButton.classList.add('selected-date');
            }
            if (date.toDateString() === today.toDateString()) {
                dateButton.classList.add('today');
            }
            dateButton.textContent = date.getDate();
            dateButton.addEventListener('click', () => this.select(date));
            dateContainer.appendChild(dateButton);
        }
        return dateContainer;
    }

    generateTitle(selectedDate) {
        const titleElement = document.createElement('div');
        titleElement.className = 'title';
        titleElement.textContent = (
            `${selectedDate.toLocaleString('default', { month: 'long', year: 'numeric'})}`
        );
        return titleElement
    }
}    
export class MonthMenu extends Menu {
    constructor(select) { 
        super();
        this.select = select;
    }

    generateMenu(selectedDate) {
        /// return a 'menu-container' with 'month-button-container' holding
        /// 16 'month-button' for 16 months starting from jan of selected year
        /// some with 'month-in-year'/'selected-month'/'current-month' class
        const today = new Date();
        const monthButtonContainer = document.createElement('div');
        monthButtonContainer.className = 'month-button-container';
        for (let i = 0; i < 16; i++) {
            const date = new Date(selectedDate);
            date.setDate(1); // to avoid leakage 
            date.setMonth(i);
            const monthButton = document.createElement('button');
            monthButton.className = 'month-button';
            if (date.getFullYear() === selectedDate.getFullYear()) {
                monthButton.classList.add('month-in-year');
                if (date.getMonth() === selectedDate.getMonth()) {
                    monthButton.classList.add('selected-month');
                }
            }
            if (date.getMonth() === today.getMonth() 
                && date.getFullYear() === today.getFullYear()) {
                monthButton.classList.add('current-month');
            }
            monthButton.textContent = date.toLocaleString('default',{month: 'short'});
            monthButton.addEventListener('click', () => this.select(date));
            monthButtonContainer.appendChild(monthButton);
        }
        const menuContainer = document.createElement('div');
        menuContainer.className = 'menu-container';
        menuContainer.appendChild(monthButtonContainer);
        return menuContainer;
    }

    generateTitle(selectedDate) {
        const titleElement = document.createElement('div');
        titleElement.className = 'title';
        titleElement.textContent = (
            `${selectedDate.getFullYear()}`
        );
        return titleElement;
    }
}
export class YearMenu extends Menu {
    constructor(select) {
        super();
        this.select = select;
    }

    generateMenu(selectedDate) {
        /// return a 'menu-container' with 'year-button-container' holding
        /// 16 'year-button' for 16 years starting from 4 years before selected year
        /// some with 'near-year'/'selected-year'/'current-year' class
        const today = new Date();
        const yearContainer = document.createElement('div');
        yearContainer.className = 'year-button-container';
        for (let i = 0; i < 16; i++) {
            const date = new Date(selectedDate);
            date.setDate(1); // to avoid leakage
            date.setFullYear(date.getFullYear() + i - 4);
            const yearElement = document.createElement('button');
            yearElement.className = 'year-button';
            if (i < 10) {
                yearElement.classList.add('near-year');
            }
            if (date.getFullYear() === selectedDate.getFullYear()) {
                yearElement.classList.add('selected-year');
            }
            if (date.getFullYear() === today.getFullYear()) {
                yearElement.classList.add('current-year');
            }
            yearElement.textContent = date.getFullYear();
            yearElement.addEventListener('click', () => this.select(date));
            yearContainer.appendChild(yearElement);
        }
        const menuContainer = document.createElement('div');
        menuContainer.className = 'menu-container';
        menuContainer.appendChild(yearContainer);
        return menuContainer
    }

    generateTitle(selectedDate) {
        const titleElement = document.createElement('div');
        titleElement.className = 'title';
        titleElement.textContent = (
            `${selectedDate.getFullYear() - 4} - ${selectedDate.getFullYear() + 5}`
        );
        return titleElement
    }
}
