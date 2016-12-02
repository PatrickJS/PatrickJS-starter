import { Component } from '@angular/core';

@Component({
	selector: 'main-container',
	template: 	`
		<div>
			<AppBar></AppBar>
			<main class="main">
				<drops-container>
				</drops-container>
			</main>
		</div>
	`
})

export class Main {};