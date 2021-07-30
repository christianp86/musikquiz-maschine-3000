<script>
	import Select from 'svelte-select@4.2.7';

	const items = ['One', 'Two', 'Three'];

	const groupBy = (item) => item.group;
	const optionIdentifier = 'id';
	const getOptionLabel = (option) => option.name;
	const getSelectionLabel = (option) => option.name;
</script>

<h2>Async</h2>
<Select {loadOptions} {optionIdentifier} {getSelectionLabel} {getOptionLabel} {Item} placeholder="Search for 🍺"></Select>