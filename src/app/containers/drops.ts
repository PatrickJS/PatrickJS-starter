import { Component } from '@angular/core';

@Component({
	selector: 'drops-container',
	styles: [`
		.notes {
			padding-top: 50px;
		}
		.creator {
			margin-bottom: 40px; 
		}
	`],
	template: `
		<div class="row center-xs notes">
			<div class="col-xs-6 creator">
				note creator here
			</div>
			<div class="notes col-xs-8">
				<div class="row between-xs">
					<drop
					[drop]="drop">

					</drop>
				</div>
			</div>
		</div>
	`
})

export class DropsContainer {
	drop = {title: 'Uncle Sam\'s Bowling', desc: '4:20pm be there or be [ ]'}
}