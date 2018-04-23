import { Droppable, DroppableProvided } from 'react-beautiful-dnd';
import * as React from 'react';
import * as classNames from 'classnames';
import './InstructionList.css';
import LayoutRow from '../layout/LayoutRow/LayoutRow';
import LayoutCol from '../layout/LayoutCol/LayoutCol';

export interface Props {
  droppabledId: string;
  decorateForDragInProgress: boolean;
  title: string;
  className?: string;
  children: any;
}

export default (props: Props) => (
  <Droppable droppableId={props.droppabledId}>
    {(provided: DroppableProvided, snapshot) => (
      <LayoutRow>
        <LayoutCol
          sm={12}
          className={
            classNames(
              props.className,
              'instruction-list'
            )}
        >
          <LayoutRow>
            <LayoutCol
              className={
                classNames(
                  'instruction-list__title',
                  `${props.className}__title`,
                )}
            >
              {props.title}
            </LayoutCol>
          </LayoutRow>
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={
              classNames(
                'row',  // react-beautiful-dnd doesn't work with my LayoutRow
                'instruction-list__list',
                `${props.className}__list`,
                {
                  [`${props.className}__list--drag-in-progress`]: props.decorateForDragInProgress,
                  [`${props.className}__list--dragging-over`]: snapshot.isDraggingOver
                }
              )
            }
          >
            <LayoutCol className="col-wrapping-instruction-list" sm={12}>
              {props.children}
              {provided.placeholder}
            </LayoutCol>
          </div>
        </LayoutCol>
      </LayoutRow>
    )}
  </Droppable>
);
