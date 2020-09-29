# frozen_string_literal: true

# CommentsController
class CommentsController < ApplicationController
  before_action :require_login
  before_action :set_params, only: %i[readed update destroy]

  # POST /comments
  def create
    @comment = Comment.new(comment_params)
    authorize @comment
    @comment.readed = false
    if @comment.save
      render json: ApplicationSerializer.id_to_json(@comment.id), status: :ok
    else
      render json: ApplicationSerializer.error_response(@comment.errors.messages)
    end
  end

  # POST /comments/:id/readed
  def readed
    authorize @comment
    @comment.readed = true
    if @comment.save
      render json: CommentSerializer.readed_comment_to_json(@comment.step_id, @comment.step.procedure_id), status: :ok
    else
      render json: ApplicationSerializer.error_response(@comment.errors.messages)
    end
  end

  # PUT /comments/:id
  def update
    authorize @comment
    if @comment.update_attributes(comment_params)
      render json: ApplicationSerializer.id_to_json(@comment.id), status: :ok
    else
      render json: ApplicationSerializer.error_response(@comment.errors.messages)
    end
  end

  # DELETE /comments/:id
  def destroy
    authorize @comment
    if @comment.delete
      render json: CommentSerializer.readed_comment_to_json(@comment.step_id, @comment.step.procedure_id), status: :ok
    else
      head :bad_request
    end
  end

  # POST /comments/delete_all
  def delete_all
    authorize Comment
    if delete_all_by_step
      render json: CommentSerializer.readed_comment_to_json(params[:step_id], params[:procedure_id]), status: :ok
    else
      head :bad_request
    end
  end

  private

  def set_params
    @comment = Comment.includes(:step).find(params[:id])
  end

  def comment_params
    params.require(:comment).permit(policy(@comment || Comment.new).permitted_attributes)
  end

  def delete_all_by_step
    return false if params[:step_id].blank?

    step = Step.where(id: params[:step_id]).first
    return false if step.blank?

    step.comments&.each(&:destroy)
    true
  end
end