import { useBlockProps } from '@wordpress/block-editor';

const Edit = () => {
	const blockProps = useBlockProps();
	return (
		<div { ...blockProps } id="box">
			<div id="field" style={ { margin: '200px auto 0' } }></div>
			<div id="lost" style={ { display: 'none' } }></div>
		</div>
	);
};

export default Edit;
