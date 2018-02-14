import { EntityInterface } from './entity-interface';

/**
 * Abstract class which represents entities which do not have a creation date.
 *
 * @author Arnaud Lavallée (arnaud.lavallee44@gmail.com)
 */
export abstract class AbstractEntity implements EntityInterface {

  /**
   * The id of the entity.
   */
  id: number;

}
