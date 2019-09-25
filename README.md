# alexa-skill-apl-pager-problem
Alexa skill to demo an APL problem with pager events

This skill demonstrates that pager events don't fire at all in simulator and in any other devices with screen when APL changes from first page to second one.

How to simulate ?
- Write in simulator "pagina bien"
- It will speak "Hola, vamos a probar el paginador" and it will show first page
- After five seconds it will show second page
- If pager events will work properly, then it will speak "Enhorabuena, el evento ha saltado correctamente !!". But it will never happens
