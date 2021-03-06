import React from 'react';
import { Link } from 'react-router-dom';

import Avatar from './Avatar';
import Tag from './Tag';
import Time from './Time';
import { getKeywords, getTicketType } from '../lib/workflow';

import './TicketListItem.css';

export default class TicketListItem extends React.PureComponent {
	render() {
		const { ticket } = this.props;

		const keywords = ticket.attributes.keywords;
		const hasPatch = keywords.indexOf( 'has-patch' ) >= 0;
		const needsTesting = keywords.indexOf( 'needs-testing' ) >= 0;
		let milestone = ticket.attributes.milestone;
		if ( milestone === 'Awaiting Review' ) {
			milestone = null;
		}

		const type = getTicketType( ticket );

		return <li className="TicketListItem">
			<div className={ `col-type type-${ type }` }>
				{ type === 'bug' ?
					<span className="dashicons dashicons-warning"></span>
				: type === 'enhancement' ?
					<span className="dashicons dashicons-plus-alt"></span>
				:
					<span className="dashicons dashicons-admin-tools"></span>
				}
			</div>
			<div className="col-main">
				<div className="TicketListItem-detail-title-block">
					<p className="TicketListItem-detail-title">
						<Link to={ `/ticket/${ ticket.id }` }>
							{ ticket.attributes.summary }
						</Link>
					</p>
					{ ticket.attributes.keywords ?
						<div className="TicketListItem-detail-tags">
							{ getKeywords( ticket ).map( tag => <Tag key={ tag } name={ tag } />) }
						</div>
					: null }
				</div>
				<small>
					#{ ticket.id }
					{ ' opened ' }
					<Time timestamp={ ticket.attributes.time } />
					{ ' by ' }
					@{ ticket.attributes.reporter }
					{ milestone ?
						<span className="TicketListItem-detail-milestone">
							<span className="dashicons dashicons-post-status"></span>
							{ milestone }
						</span>
					: null }
				</small>
			</div>
			<div className="col-extra">
				<span className="TicketListItem-detail-owner">
					{ ticket.attributes.owner ?
						<Avatar
							size={ 20 }
							user={ ticket.attributes.owner }
						/>
					: null }
				</span>
				<span className="TicketListItem-detail-patch">
					{ hasPatch ?
						<span className="dashicons dashicons-paperclip"></span>
					: needsTesting ?
						<span className="dashicons dashicons-sos"></span>
					:
						<span />
					}
				</span>
			</div>
		</li>;
	}
}