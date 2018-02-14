import { Observable } from 'rxjs/Observable';
import * as Rx from 'rxjs/Rx';

/**
 * Entity which represents a Game.
 *
 * @author Vincent Léné (vincent.lene.dl@gmail.com)
 */
export class Game {

  /**
   * The elapsed time of the game.
   */
  public elapsedTime$ = new Observable<number>();

  constructor() {
  }

  public start() {
    this.elapsedTime$ = Rx.Observable.timer(0, 1000);
  }

}
