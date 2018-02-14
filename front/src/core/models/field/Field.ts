import { Moment } from 'moment';
import { Config } from '../../../config/config';
/**
 * Entity which represents a Field.
 *
 * @author Vincent Léné (vincent.lene.dl@gmail.com)
 */
import { Cistern } from '../cistern/Cistern';
import { Game } from '../game/Game';

export class Field {

  /**
   * The remaining time before harvest.
   */
  public remainingTime: Moment;

  /**
   * The associated cistern for this field.
   */
  public cistern: Cistern;

  /**
   * Boolean to figure out if the field is mature to be harvested.
   */
  public isHarvestingPossible: boolean;

}
