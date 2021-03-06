import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';

import { map, tap } from 'rxjs/operators';
import { Recipe } from '../recipes/recipe.model';
import { RecipeService } from '../recipes/recipe.service';

import * as fromApp from '../store/app.reducer';
import * as RecipesActions from '../recipes/store/recipe.actions';

@Injectable({ providedIn: 'root' })
export class DatStorageService {
  constructor(
    private http: HttpClient,
    private recipeService: RecipeService,
    private store: Store<fromApp.AppState>
  ) {}

  storeRecipes() {
    const recipes = this.recipeService.getRecipes();

    this.http
      .put(
        'https://catch-of-the-day-conary.firebaseio.com/recipes.json',
        recipes
      )
      .subscribe((response) => {
        console.log('response', response);
      });
  }

  fetchRecipes() {
    return this.http
      .get<Recipe[]>(
        'https://catch-of-the-day-conary.firebaseio.com/recipes.json'
      )
      .pipe(
        map((recipes) => {
          if (recipes) {
            return recipes.map((recipe) => {
              return {
                ...recipe,
                ingredients: recipe.ingredients ? recipe.ingredients : [],
              };
            });
          }

          return [];
        }),
        tap((recipes) => {
          this.store.dispatch(new RecipesActions.SetRecipes(recipes));
          // this.recipeService.setRecipes(recipes);
        })
      );
  }
}
